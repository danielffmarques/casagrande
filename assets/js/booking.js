/**
 * CASA GRANDE — MOTOR DE RESERVA DIRECTA & PAGAMENTOS SEGUROS
 * Standard Bruto: Seleção limpa de alojamento sem preços nos rótulos,
 * Calendário Range Datepicker interactivo (estilo canónico Casa do Olival / Casinhas de Santo António),
 * MB WAY instantâneo, Cartão com validação, Multibanco e Faturação com NIF
 */

document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('direct-booking-form');
  const unitSelect = document.getElementById('unit-select');
  const checkinInput = document.getElementById('checkin-date');
  const checkoutInput = document.getElementById('checkout-date');
  const btnOpenIn = document.getElementById('btn-open-cal-checkin');
  const btnOpenOut = document.getElementById('btn-open-cal-checkout');
  const extraCribCheck = document.getElementById('extra-crib');
  const extraBedCheck = document.getElementById('extra-bed');
  const ranchoCribOption = document.getElementById('rancho-crib-option');
  const caseiraBedOption = document.getElementById('caseira-bed-option');
  const invoiceToggle = document.getElementById('invoice-toggle');
  const invoiceFields = document.getElementById('invoice-fields');
  
  const paymentTabs = document.querySelectorAll('.payment-tab-btn');
  const btnSubmit = document.getElementById('btn-submit-booking');
  const modal = document.getElementById('confirmation-modal');
  const modalClose = document.getElementById('modal-close');
  
  // Elementos do Resumo Sticky
  const summaryUnitName = document.getElementById('summary-unit-name');
  const summaryNights = document.getElementById('summary-nights');
  const summaryRate = document.getElementById('summary-rate');
  const summaryExtrasRow = document.getElementById('summary-extras-row');
  const summaryExtrasVal = document.getElementById('summary-extras-val');
  const summaryTotalPrice = document.getElementById('summary-total-price');

  // Preços e Regras Fatuais dos 9 Alojamentos
  const unitData = {
    cameleiras: { name: 'Apartamento das Cameleiras (Solar T1)', price: 85, allowsCrib: false, allowsBed: false },
    ciprestes: { name: 'Apartamento dos Ciprestes (Solar T1)', price: 85, allowsCrib: false, allowsBed: false },
    laranjeiras: { name: 'Apartamento das Laranjeiras (Solar T1)', price: 85, allowsCrib: false, allowsBed: false },
    azeitona: { name: 'Casa da Azeitona (Campo T1)', price: 85, allowsCrib: false, allowsBed: false },
    rancho: { name: 'Casa do Rancho (Campo T1)', price: 85, allowsCrib: true, allowsBed: false },
    caseira: { name: 'Casa da Caseira (Campo T1)', price: 85, allowsCrib: false, allowsBed: true },
    burro: { name: 'Casa do Burro (Campo T1)', price: 85, allowsCrib: false, allowsBed: false },
    telheiro: { name: 'Casa do Telheiro (Campo T3)', price: 255, allowsCrib: false, allowsBed: false },
    olival: { name: 'Casa do Olival (Campo T4)', price: 340, allowsCrib: false, allowsBed: false }
  };

  // Pré-seleção por parâmetro URL (ex: ?unit=cameleiras)
  const urlParams = new URLSearchParams(window.location.search);
  const paramUnit = urlParams.get('unit');
  if (paramUnit && unitData[paramUnit] && unitSelect) {
    unitSelect.value = paramUnit;
  }

  // ==========================================================================
  // UTILITÁRIOS DE DATAS E PARSING
  // ==========================================================================
  function parseDateFlexible(val) {
    if (!val) return null;
    if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
    if (typeof val === 'string') {
      const trimmed = val.trim();
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
        const [d, m, y] = trimmed.split('/').map(Number);
        return new Date(y, m - 1, d);
      }
      if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
        const [y, m, d] = trimmed.split('-').map(Number);
        return new Date(y, m - 1, d);
      }
      const parsed = new Date(trimmed);
      return isNaN(parsed.getTime()) ? null : parsed;
    }
    return null;
  }

  function formatDateDisplay(d) {
    if (!d) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const y = d.getFullYear();
    return `${day}/${m}/${y}`;
  }

  function formatDateISO(d) {
    if (!d) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const y = d.getFullYear();
    return `${y}-${m}-${day}`;
  }

  function isSameDay(d1, d2) {
    if (!d1 || !d2) return false;
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  }

  function isBeforeDay(d1, d2) {
    if (!d1 || !d2) return false;
    const t1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
    const t2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();
    return t1 < t2;
  }

  function isAfterDay(d1, d2) {
    if (!d1 || !d2) return false;
    const t1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
    const t2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();
    return t1 > t2;
  }

  // Preenche datas padrão (7 dias no futuro, estadia de 2 noites)
  const today = new Date();
  const defaultIn = new Date();
  defaultIn.setDate(today.getDate() + 7);
  const defaultOut = new Date();
  defaultOut.setDate(today.getDate() + 9);

  let selectedCheckin = defaultIn;
  let selectedCheckout = defaultOut;

  if (checkinInput && !checkinInput.value) {
    checkinInput.value = formatDateDisplay(defaultIn);
  }
  if (checkoutInput && !checkoutInput.value) {
    checkoutInput.value = formatDateDisplay(defaultOut);
  }

  // ==========================================================================
  // POPOVER DO CALENDÁRIO CANÓNICO INTERATIVO BRUTO (RANGE PICKER)
  // ==========================================================================
  const popover = document.getElementById('brutoDatepicker');
  const monthTitle = document.getElementById('dpMonthTitle');
  const daysGrid = document.getElementById('dpDaysGrid');
  const prevBtn = document.getElementById('dpPrevBtn');
  const nextBtn = document.getElementById('dpNextBtn');

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  let currentMonth = new Date(defaultIn.getFullYear(), defaultIn.getMonth(), 1);
  let hoverDate = null;
  let pickerStep = 'checkin'; // 'checkin' | 'checkout'
  let currentTriggerEl = null;

  function updateDayHighlights() {
    if (!daysGrid) return;
    const cells = daysGrid.querySelectorAll('.datepicker-day-cell');
    cells.forEach(cell => {
      const btn = cell.querySelector('.datepicker-day-btn');
      if (!btn || !btn.getAttribute('data-date')) return;
      const cellDate = parseDateFlexible(btn.getAttribute('data-date'));
      if (!cellDate) return;

      cell.classList.remove('is-start', 'is-end', 'is-in-range', 'is-hover-range');

      const isStart = selectedCheckin && isSameDay(cellDate, selectedCheckin);
      const isEnd = selectedCheckout && isSameDay(cellDate, selectedCheckout);

      if (isStart) cell.classList.add('is-start');
      if (isEnd) cell.classList.add('is-end');

      if (selectedCheckin && selectedCheckout) {
        if (isAfterDay(cellDate, selectedCheckin) && isBeforeDay(cellDate, selectedCheckout)) {
          cell.classList.add('is-in-range');
        }
      } else if (selectedCheckin && pickerStep === 'checkout' && hoverDate) {
        if (isAfterDay(cellDate, selectedCheckin) && (isBeforeDay(cellDate, hoverDate) || isSameDay(cellDate, hoverDate))) {
          cell.classList.add('is-hover-range');
        }
      }
    });
  }

  function renderCalendar() {
    if (!daysGrid || !monthTitle) return;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    monthTitle.textContent = `${monthNames[month]} ${year}`;

    // Desativar recuo para meses anteriores ao mês corrente
    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    if (prevBtn) {
      prevBtn.disabled = currentMonth <= startOfCurrentMonth;
      prevBtn.style.opacity = prevBtn.disabled ? '0.35' : '1';
    }

    // Primeiro dia da semana (Segunda-feira = 0)
    const firstDayIndex = new Date(year, month, 1).getDay();
    const startOffset = (firstDayIndex + 6) % 7;
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    daysGrid.innerHTML = '';

    // Células vazias de offset
    for (let i = 0; i < startOffset; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'datepicker-day-cell';
      daysGrid.appendChild(emptyCell);
    }

    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Gerar dias do mês
    for (let dayNum = 1; dayNum <= totalDaysInMonth; dayNum++) {
      const cellDate = new Date(year, month, dayNum);
      const isPast = cellDate < todayDate;

      const cell = document.createElement('div');
      cell.className = 'datepicker-day-cell';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'datepicker-day-btn';
      btn.textContent = dayNum;
      btn.setAttribute('data-date', formatDateISO(cellDate));

      if (isPast) {
        btn.disabled = true;
      } else {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          onDateClick(cellDate);
        });

        btn.addEventListener('mouseenter', () => {
          if (pickerStep === 'checkout' && selectedCheckin) {
            hoverDate = cellDate;
            updateDayHighlights();
          }
        });
      }

      cell.appendChild(btn);
      daysGrid.appendChild(cell);
    }

    updateDayHighlights();
  }

  function onDateClick(clickedDate) {
    if (pickerStep === 'checkin') {
      selectedCheckin = clickedDate;
      selectedCheckout = null;
      hoverDate = null;
      pickerStep = 'checkout';

      if (checkinInput) {
        checkinInput.value = formatDateDisplay(selectedCheckin);
      }
      if (checkoutInput) {
        checkoutInput.value = '';
      }
      updateDayHighlights();
    } else if (pickerStep === 'checkout') {
      if (isBeforeDay(clickedDate, selectedCheckin) || isSameDay(clickedDate, selectedCheckin)) {
        selectedCheckin = clickedDate;
        selectedCheckout = null;
        hoverDate = null;
        pickerStep = 'checkout';

        if (checkinInput) {
          checkinInput.value = formatDateDisplay(selectedCheckin);
        }
        if (checkoutInput) {
          checkoutInput.value = '';
        }
        updateDayHighlights();
      } else {
        selectedCheckout = clickedDate;
        pickerStep = 'checkin';

        if (checkoutInput) {
          checkoutInput.value = formatDateDisplay(selectedCheckout);
        }
        updateDayHighlights();
        recalculate();

        setTimeout(() => {
          closePopover();
        }, 220);
      }
    }
  }

  function positionPopover(targetEl) {
    if (!popover || !targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const popoverWidth = popover.offsetWidth || 326;
    const popoverHeight = popover.offsetHeight || 360;

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    let topPos, leftPos;

    if (spaceBelow >= popoverHeight || spaceBelow >= spaceAbove) {
      topPos = rect.bottom + 8;
    } else {
      topPos = rect.top - popoverHeight - 8;
    }

    leftPos = rect.left;
    if (leftPos + popoverWidth > viewportWidth - 16) {
      leftPos = Math.max(16, viewportWidth - popoverWidth - 16);
    }

    popover.style.top = `${Math.round(topPos)}px`;
    popover.style.left = `${Math.round(leftPos)}px`;
  }

  function openPicker(initialStep, triggerElement) {
    if (!popover) return;
    pickerStep = initialStep || 'checkin';
    currentTriggerEl = triggerElement || checkinInput;

    const parsedIn = parseDateFlexible(checkinInput.value);
    const parsedOut = parseDateFlexible(checkoutInput.value);

    if (parsedIn) selectedCheckin = parsedIn;
    if (parsedOut) selectedCheckout = parsedOut;

    if (selectedCheckin) {
      currentMonth = new Date(selectedCheckin.getFullYear(), selectedCheckin.getMonth(), 1);
    } else {
      currentMonth = new Date();
      currentMonth.setDate(1);
    }

    renderCalendar();
    popover.classList.add('active');
    positionPopover(currentTriggerEl);
  }

  function closePopover() {
    if (popover) {
      popover.classList.remove('active');
      hoverDate = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentMonth.setMonth(currentMonth.getMonth() - 1);
      renderCalendar();
      if (currentTriggerEl) positionPopover(currentTriggerEl);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentMonth.setMonth(currentMonth.getMonth() + 1);
      renderCalendar();
      if (currentTriggerEl) positionPopover(currentTriggerEl);
    });
  }

  // Abrir ao clicar nos inputs ou nos botões de calendário
  const triggerIn = checkinInput ? (checkinInput.closest('.date-input-container') || checkinInput) : null;
  const triggerOut = checkoutInput ? (checkoutInput.closest('.date-input-container') || checkoutInput) : null;

  if (checkinInput) {
    checkinInput.addEventListener('click', (e) => {
      e.preventDefault();
      openPicker('checkin', triggerIn);
    });
  }
  if (btnOpenIn) {
    btnOpenIn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openPicker('checkin', triggerIn);
    });
  }

  if (checkoutInput) {
    checkoutInput.addEventListener('click', (e) => {
      e.preventDefault();
      openPicker('checkout', triggerOut);
    });
  }
  if (btnOpenOut) {
    btnOpenOut.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openPicker('checkout', triggerOut);
    });
  }

  // Fecho ao clicar fora ou na tecla Escape
  document.addEventListener('click', (e) => {
    if (!popover || !popover.classList.contains('active')) return;
    if (popover.contains(e.target)) return;
    if (triggerIn && triggerIn.contains(e.target)) return;
    if (triggerOut && triggerOut.contains(e.target)) return;
    closePopover();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popover && popover.classList.contains('active')) {
      closePopover();
    }
  });

  window.addEventListener('scroll', () => {
    if (popover && popover.classList.contains('active') && currentTriggerEl) {
      positionPopover(currentTriggerEl);
    }
  }, true);

  window.addEventListener('resize', () => {
    if (popover && popover.classList.contains('active') && currentTriggerEl) {
      positionPopover(currentTriggerEl);
    }
  });

  // ==========================================================================
  // RECÁLCULO DE VALORES E ATUALIZAÇÃO DO RESUMO STICKY
  // ==========================================================================
  function updateExtrasDisplay() {
    const selectedKey = unitSelect ? unitSelect.value : 'cameleiras';
    const unit = unitData[selectedKey] || unitData['cameleiras'];

    if (ranchoCribOption) {
      ranchoCribOption.style.display = unit.allowsCrib ? 'block' : 'none';
      if (!unit.allowsCrib && extraCribCheck) extraCribCheck.checked = false;
    }

    if (caseiraBedOption) {
      caseiraBedOption.style.display = unit.allowsBed ? 'block' : 'none';
      if (!unit.allowsBed && extraBedCheck) extraBedCheck.checked = false;
    }

    recalculate();
  }

  function recalculate() {
    const selectedKey = unitSelect ? unitSelect.value : 'cameleiras';
    const unit = unitData[selectedKey] || unitData['cameleiras'];

    const dateIn = parseDateFlexible(checkinInput.value) || defaultIn;
    const dateOut = parseDateFlexible(checkoutInput.value) || defaultOut;

    let diffDays = Math.ceil((dateOut.getTime() - dateIn.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 2 || isNaN(diffDays)) {
      diffDays = 2; // Estadia mínima factual
    }

    let dailyPrice = unit.price;
    // Se época festiva (Natal, Fim de Ano, Carnaval, Páscoa)
    const month = dateIn.getMonth();
    const isFestive = (month === 11 || month === 0);
    if (isFestive) {
      if (unit.price === 85) dailyPrice = 95;
      else if (unit.price === 255) dailyPrice = 285;
      else if (unit.price === 340) dailyPrice = 380;
    }

    let extrasTotal = 0;
    let extrasList = [];

    if (extraCribCheck && extraCribCheck.checked && unit.allowsCrib) {
      const cribVal = 10 * diffDays;
      extrasTotal += cribVal;
      extrasList.push(`Berço (${cribVal} €)`);
    }

    if (extraBedCheck && extraBedCheck.checked && unit.allowsBed) {
      const bedVal = 25 * diffDays;
      extrasTotal += bedVal;
      extrasList.push(`Cama Extra (${bedVal} €)`);
    }

    const total = (dailyPrice * diffDays) + extrasTotal;

    // Atualiza resumo
    if (summaryUnitName) summaryUnitName.textContent = unit.name;
    if (summaryNights) summaryNights.textContent = `${diffDays} Noites`;
    if (summaryRate) summaryRate.textContent = `${dailyPrice} € / noite`;

    if (summaryExtrasRow) {
      if (extrasTotal > 0) {
        summaryExtrasRow.style.display = 'flex';
        summaryExtrasVal.textContent = `+${extrasTotal} € (${extrasList.join(', ')})`;
      } else {
        summaryExtrasRow.style.display = 'none';
      }
    }

    if (summaryTotalPrice) summaryTotalPrice.textContent = `${total} €`;

    if (btnSubmit) {
      btnSubmit.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <span>Confirmar Reserva e Pagar Agora (${total} €)</span>
      `;
    }
  }

  // ==========================================================================
  // WIZARD PROGRESSIVO DE RESERVAS: PASSOS 1, 2 E 3
  // Os passos aparecem sucessivamente após validação do passo anterior
  // ==========================================================================
  const step1 = document.getElementById('booking-step-1');
  const step2 = document.getElementById('booking-step-2');
  const step3 = document.getElementById('booking-step-3');

  const btnNextTo2 = document.getElementById('btn-next-to-step-2');
  const btnBackTo1 = document.getElementById('btn-back-to-step-1');
  const btnNextTo3 = document.getElementById('btn-next-to-step-3');
  const btnBackTo2 = document.getElementById('btn-back-to-step-2');

  const tabStep1 = document.getElementById('tab-step-1');
  const tabStep2 = document.getElementById('tab-step-2');
  const tabStep3 = document.getElementById('tab-step-3');
  const lineStep1 = document.getElementById('line-step-1');
  const lineStep2 = document.getElementById('line-step-2');
  const badgeStep1 = document.getElementById('badge-step-1');
  const badgeStep2 = document.getElementById('badge-step-2');
  const badgeStep3 = document.getElementById('badge-step-3');

  function validateStep1() {
    const selectedKey = unitSelect ? unitSelect.value : null;
    if (!selectedKey || !unitData[selectedKey]) {
      if (unitSelect) unitSelect.classList.add('field-validation-error');
      return false;
    }
    if (unitSelect) unitSelect.classList.remove('field-validation-error');

    const dateIn = parseDateFlexible(checkinInput.value);
    const dateOut = parseDateFlexible(checkoutInput.value);

    if (!dateIn || !dateOut || isBeforeDay(dateOut, dateIn) || isSameDay(dateOut, dateIn)) {
      if (checkinInput) checkinInput.classList.add('field-validation-error');
      if (checkoutInput) checkoutInput.classList.add('field-validation-error');
      openPicker('checkin', checkinInput);
      return false;
    }

    const diffDays = Math.ceil((dateOut.getTime() - dateIn.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 2) {
      alert('A Casa Grande pratica uma estadia mínima de 2 noites. Por favor selecione uma estadia com pelo menos 2 noites.');
      openPicker('checkout', checkoutInput);
      return false;
    }

    if (checkinInput) checkinInput.classList.remove('field-validation-error');
    if (checkoutInput) checkoutInput.classList.remove('field-validation-error');
    return true;
  }

  function goToStep2() {
    if (!validateStep1()) return false;

    // Revela Passo 2
    if (step2) {
      step2.classList.remove('is-step-hidden');
      step2.classList.add('is-step-visible');
    }

    // Atualiza Abas do Wizard
    if (tabStep1) {
      tabStep1.classList.remove('active');
      tabStep1.classList.add('is-done');
    }
    if (lineStep1) lineStep1.classList.add('is-done');
    if (badgeStep1) badgeStep1.classList.add('is-done');

    if (tabStep2) {
      tabStep2.classList.add('active');
    }

    // Scroll suave até o Passo 2
    if (step2) {
      step2.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const nameInput = document.getElementById('guest-name');
        if (nameInput) nameInput.focus();
      }, 350);
    }
    return true;
  }

  function validateStep2() {
    const nameInput = document.getElementById('guest-name');
    const emailInput = document.getElementById('guest-email');
    const phoneInput = document.getElementById('guest-phone');

    [nameInput, emailInput, phoneInput].forEach(el => {
      if (el) el.classList.remove('field-validation-error');
    });

    if (!nameInput || !nameInput.value.trim()) {
      if (nameInput) {
        nameInput.classList.add('field-validation-error');
        nameInput.focus();
      }
      alert('Por favor introduza o seu nome completo antes de prosseguir.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
      if (emailInput) {
        emailInput.classList.add('field-validation-error');
        emailInput.focus();
      }
      alert('Por favor introduza um endereço de e-mail válido.');
      return false;
    }

    const phoneVal = phoneInput ? phoneInput.value.trim().replace(/[\s\-\(\)]/g, '') : '';
    if (!phoneInput || phoneVal.length < 9) {
      if (phoneInput) {
        phoneInput.classList.add('field-validation-error');
        phoneInput.focus();
      }
      alert('Por favor introduza um número de telemóvel para coordenação da chegada.');
      return false;
    }

    if (invoiceToggle && invoiceToggle.checked) {
      const nifInput = document.getElementById('fiscal-nif');
      if (nifInput && nifInput.value.trim()) {
        const cleanNif = nifInput.value.trim().replace(/\s/g, '');
        if (cleanNif.length !== 9 || isNaN(Number(cleanNif))) {
          nifInput.classList.add('field-validation-error');
          alert('Por favor introduza um NIF / NIPC válido com 9 dígitos numéricos.');
          nifInput.focus();
          return false;
        }
      }
    }

    return true;
  }

  function goToStep3() {
    if (!validateStep1()) return false;
    if (!step2 || step2.classList.contains('is-step-hidden')) {
      goToStep2();
      return false;
    }
    if (!validateStep2()) return false;

    // Revela Passo 3
    if (step3) {
      step3.classList.remove('is-step-hidden');
      step3.classList.add('is-step-visible');
    }

    // Atualiza Abas do Wizard
    if (tabStep2) {
      tabStep2.classList.remove('active');
      tabStep2.classList.add('is-done');
    }
    if (lineStep2) lineStep2.classList.add('is-done');
    if (badgeStep2) badgeStep2.classList.add('is-done');

    if (tabStep3) {
      tabStep3.classList.add('active');
    }

    // Pré-preenche telemóvel no MB WAY se vazio
    const guestPhone = document.getElementById('guest-phone');
    const mbwayPhone = document.getElementById('mbway-phone');
    if (guestPhone && mbwayPhone && !mbwayPhone.value && guestPhone.value) {
      mbwayPhone.value = guestPhone.value;
    }

    // Scroll suave até o Passo 3
    if (step3) {
      step3.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return true;
  }

  function goToStep1() {
    if (step1) {
      step1.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (tabStep1) tabStep1.classList.add('active');
    if (tabStep2) tabStep2.classList.remove('active');
  }

  function goToStep2FromBack() {
    if (step2) {
      step2.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (tabStep2) tabStep2.classList.add('active');
    if (tabStep3) tabStep3.classList.remove('active');
  }

  if (btnNextTo2) btnNextTo2.addEventListener('click', goToStep2);
  if (btnBackTo1) btnBackTo1.addEventListener('click', goToStep1);
  if (btnNextTo3) btnNextTo3.addEventListener('click', goToStep3);
  if (btnBackTo2) btnBackTo2.addEventListener('click', goToStep2FromBack);

  // Cliques nas abas superiores
  if (tabStep1) {
    tabStep1.addEventListener('click', goToStep1);
  }
  if (tabStep2) {
    tabStep2.addEventListener('click', () => {
      if (step2 && !step2.classList.contains('is-step-hidden')) {
        goToStep2FromBack();
      } else {
        goToStep2();
      }
    });
  }
  if (tabStep3) {
    tabStep3.addEventListener('click', () => {
      if (step3 && !step3.classList.contains('is-step-hidden')) {
        step3.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (tabStep3) tabStep3.classList.add('active');
      } else {
        goToStep3();
      }
    });
  }

  // Ouvintes de alteração
  if (unitSelect) unitSelect.addEventListener('change', updateExtrasDisplay);
  if (extraCribCheck) extraCribCheck.addEventListener('change', recalculate);
  if (extraBedCheck) extraBedCheck.addEventListener('change', recalculate);

  // Toggle de Faturação
  if (invoiceToggle && invoiceFields) {
    invoiceToggle.addEventListener('change', () => {
      invoiceFields.style.display = invoiceToggle.checked ? 'block' : 'none';
      if (invoiceToggle.checked) {
        const guestName = document.getElementById('guest-name');
        const fiscalName = document.getElementById('fiscal-name');
        if (guestName && fiscalName && guestName.value && !fiscalName.value) {
          fiscalName.value = guestName.value;
        }
      }
    });
  }

  // Abas de Métodos de Pagamento
  paymentTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      paymentTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const method = tab.dataset.method;
      const mbwayBox = document.getElementById('method-mbway');
      const cardBox = document.getElementById('method-card');
      const mbBox = document.getElementById('method-multibanco');

      if (mbwayBox) mbwayBox.style.display = method === 'mbway' ? 'block' : 'none';
      if (cardBox) cardBox.style.display = method === 'card' ? 'block' : 'none';
      if (mbBox) mbBox.style.display = method === 'multibanco' ? 'block' : 'none';
    });
  });

  // Confirmação e Modal através do Botão Principal Lateral
  if (btnSubmit) {
    btnSubmit.addEventListener('click', () => {
      // Se o passo 2 ainda estiver oculto, avança para o passo 2
      if (step2 && step2.classList.contains('is-step-hidden')) {
        goToStep2();
        return;
      }

      // Se o passo 3 ainda estiver oculto, valida e avança para o passo 3
      if (step3 && step3.classList.contains('is-step-hidden')) {
        goToStep3();
        return;
      }

      // Se ambos os passos já foram abertos, valida o passo 2 novamente por garantia
      if (!validateStep2()) {
        if (step2) step2.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      // Validação do método de pagamento ativo no Passo 3
      const activeMethodTab = document.querySelector('.payment-tab-btn.active');
      const activeMethod = activeMethodTab ? activeMethodTab.dataset.method : 'mbway';

      if (activeMethod === 'mbway') {
        const mbwayPhone = document.getElementById('mbway-phone');
        if (!mbwayPhone || !mbwayPhone.value.trim() || mbwayPhone.value.trim().length < 9) {
          if (mbwayPhone) {
            mbwayPhone.classList.add('field-validation-error');
            mbwayPhone.focus();
          }
          alert('Por favor introduza o seu número de telemóvel associado ao MB WAY.');
          return;
        }
      } else if (activeMethod === 'card') {
        const cardNum = document.getElementById('card-num');
        const cardExp = document.getElementById('card-exp');
        const cardCvc = document.getElementById('card-cvc');
        if (!cardNum || cardNum.value.trim().length < 12) {
          if (cardNum) { cardNum.classList.add('field-validation-error'); cardNum.focus(); }
          alert('Por favor introduza o número do cartão de crédito válido.');
          return;
        }
        if (!cardExp || cardExp.value.trim().length < 4) {
          if (cardExp) { cardExp.classList.add('field-validation-error'); cardExp.focus(); }
          alert('Por favor introduza a data de validade (MM/AA).');
          return;
        }
        if (!cardCvc || cardCvc.value.trim().length < 3) {
          if (cardCvc) { cardCvc.classList.add('field-validation-error'); cardCvc.focus(); }
          alert('Por favor introduza o código de segurança (CVC).');
          return;
        }
      }

      const confirmedUnit = document.getElementById('modal-confirmed-unit');
      const confirmedTotal = document.getElementById('modal-confirmed-total');

      if (confirmedUnit && summaryUnitName) {
        confirmedUnit.innerHTML = `<strong>Alojamento:</strong> ${summaryUnitName.textContent}`;
      }
      if (confirmedTotal && summaryTotalPrice) {
        confirmedTotal.innerHTML = `<strong>Valor Liquidado:</strong> ${summaryTotalPrice.textContent}`;
      }

      if (modal) modal.classList.add('active');
    });
  }

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Inicialização
  updateExtrasDisplay();
});
