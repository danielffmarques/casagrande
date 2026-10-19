/**
 * CASA GRANDE — SCRIPTS PRINCIPAIS & INTERATIVIDADE
 * Estilo & Interações: vunabaka.com
 * Funcionalidades Vunabaka:
 *   1. Relógio Ambiental sem contagem de segundos (HH:mm)
 *   2. Menu Hambúrguer com Animação para 'X' e Painel Lateral Deslizante (show-nav-main)
 *   3. Cabeçalho Dinâmico no Scroll (show-fixed-header / is-scrolled com transição suave)
 *   4. Animações de Entrada no Scroll estilo AOS ([data-aos])
 *   5. Efeito Parallax em Elementos com [data-parallax="true"]
 *   6. Scroll Suave para a Próxima Secção (.js-scroll-to-next-section)
 * Standard Bruto: Zero Emojis, Transições Suaves a 60fps
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientClock();
  initHeaderScroll();
  initScrollAnimations();
  initParallax();
  initScrollToNext();
  initReviewsTicker();
  initAccommodationsInteractions();
  initActivitiesFilter();
  initPricingTableAnchor();
  initNavDrawer();
  initFaqAccordion();
  initLegalModal();
});


/* 1. RELÓGIO AMBIENTAL EM TEMPO REAL ESTILO VUNABAKA (SEM SEGUNDOS) */
function initAmbientClock() {
  const clockEl = document.getElementById('ambient-live-clock');
  const dateEl = document.getElementById('ambient-live-date');
  if (!clockEl) return;

  function updateTime() {
    const now = new Date();
    // Horário de Portugal (Lisbon / GMT) — Sem segundos (HH:mm)
    const optionsTime = { timeZone: 'Europe/Lisbon', hour: '2-digit', minute: '2-digit', hour12: false };
    const optionsDate = { timeZone: 'Europe/Lisbon', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };

    clockEl.textContent = now.toLocaleTimeString('pt-PT', optionsTime);

    if (dateEl) {
      const rawDate = now.toLocaleDateString('pt-PT', optionsDate);
      // Capitalizar a primeira letra do dia da semana
      const formattedDate = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);
      dateEl.textContent = formattedDate;
    }
  }

  updateTime();
  // Atualizar a cada 10 segundos sem pulsar os segundos
  setInterval(updateTime, 10000);
}

/* 3. CONTROLO DINÂMICO NO SCROLL (SMART STICKY COM REQUESTANIMATIONFRAME) */
function initHeaderScroll() {
  let scrollTop = 0;
  let lastScrollTop = 0;
  const threshold = 8; // Sensibilidade mínima para evitar micro-ruídos de toque/scroll
  let ticking = false;

  document.body.classList.add('page-loaded');

  function updateHeader() {
    scrollTop = Math.max(0, window.pageYOffset || document.documentElement.scrollTop);

    // Adiciona is-scrolled quando o utilizador sai do Hero
    const isPastHero = scrollTop > 100;
    document.body.classList.toggle('is-scrolled', isPastHero);
    document.body.classList.toggle('show-fixed-header', scrollTop > 10);

    // Se estiver no topo absoluto (área inicial)
    if (scrollTop <= 50) {
      document.body.classList.remove('nav-hidden');
      document.body.classList.add('nav-visible');
      document.body.classList.remove('scroll-top');
    } else {
      const delta = scrollTop - lastScrollTop;

      // Scroll para baixo: esconde os botões para leitura desimpedida
      if (delta > threshold) {
        document.body.classList.add('nav-hidden');
        document.body.classList.remove('nav-visible');
        document.body.classList.remove('scroll-top');
      }
      // Scroll para cima: revela os botões de imediato
      else if (delta < -threshold) {
        document.body.classList.remove('nav-hidden');
        document.body.classList.add('nav-visible');
        document.body.classList.add('scroll-top');
      }
    }

    lastScrollTop = scrollTop;
    ticking = false;
  }

  function handleScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('load', handleScroll, { passive: true });
  updateHeader();
}

/* 4. ANIMAÇÕES DE ENTRADA NO SCROLL ESTILO AOS */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  function checkVisible() {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('aos-animate');
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px 60px 0px', // Revela de forma antecipada para máxima fluidez
      threshold: 0.05
    });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('aos-animate'));
  }

  // Verificação inicial para elementos já na janela
  checkVisible();

  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      target.scrollIntoView();
      setTimeout(checkVisible, 150);
    }
  }
}

/* 5. EFEITO PARALLAX VUNABAKA ([data-parallax="true"]) */
function initParallax() {
  const parallaxItems = document.querySelectorAll('[data-parallax="true"]');
  if (!parallaxItems.length) return;

  let ticking = false;

  function updateParallax() {
    const windowH = window.innerHeight;

    parallaxItems.forEach(el => {
      const rect = el.getBoundingClientRect();
      // Otimização: calcular e transformar apenas quando visível ou prestes a entrar
      if (rect.bottom >= -80 && rect.top <= windowH + 80) {
        const elCenter = rect.top + rect.height / 2;
        const moveFactor = parseFloat(el.getAttribute('data-move')) || 100;
        
        // Deslocamento relativo ao centro da viewport
        const distance = (elCenter - windowH / 2) * (moveFactor / 1000);
        el.style.transform = `translate3d(0, ${(-distance).toFixed(1)}px, 0)`;
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  updateParallax();
}

/* 6. SCROLL SUAVE PARA A PRÓXIMA SECÇÃO */
function initScrollToNext() {
  const scrollButtons = document.querySelectorAll('.js-scroll-to-next-section, .scroll-indicator-btn, .btn-scroll-arrow');
  const targetSection = document.querySelector('#historia') || document.querySelector('.section-vunabaka-story');

  if (!scrollButtons.length || !targetSection) return;

  scrollButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* 7. OPINIÕES DOS HÓSPEDES: TICKER CONTÍNUO COM SUPORTE A DRAG & TECLADO */
function initReviewsTicker() {
  const reviewsWrapper = document.getElementById('reviewsTickerWrapper');
  const reviewsTrack = document.getElementById('reviewsTickerTrack');

  if (!reviewsWrapper || !reviewsTrack) return;

  // Duplicar cards para loop contínuo perfeito
  const cards = Array.from(reviewsTrack.children);
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.querySelectorAll('a, button, input').forEach(el => el.setAttribute('tabindex', '-1'));
    reviewsTrack.appendChild(clone);
  });

  let offset = 0;
  const speed = 0.55; // pixels por frame (~33px por segundo)
  let isHovered = false;
  let isDragging = false;
  let isVisible = true;
  let startX = 0;
  let dragStartOffset = 0;
  let rafId = null;

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let cachedHalfWidth = reviewsTrack.scrollWidth / 2;
  function getHalfWidth() {
    if (!cachedHalfWidth || cachedHalfWidth <= 0) {
      cachedHalfWidth = reviewsTrack.scrollWidth / 2;
    }
    return cachedHalfWidth;
  }

  const refreshWidth = () => {
    cachedHalfWidth = reviewsTrack.scrollWidth / 2;
  };
  window.addEventListener('resize', refreshWidth);
  window.addEventListener('load', refreshWidth);

  // Suspender animação quando fora da viewport para máxima eficiência de CPU/GPU
  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(reviewsWrapper);
  }

  function animate() {
    if (!isHovered && !isDragging && isVisible && !prefersReducedMotion) {
      offset += speed;
      const halfWidth = getHalfWidth();
      if (halfWidth > 0 && offset >= halfWidth) {
        offset -= halfWidth;
      }
      reviewsTrack.style.transform = `translate3d(-${offset}px, 0, 0)`;
    }
    rafId = requestAnimationFrame(animate);
  }

  rafId = requestAnimationFrame(animate);

  // Pausar rotação ao passar o cursor ou focar via teclado (WCAG 2.2.2 Pause)
  reviewsWrapper.addEventListener('mouseenter', () => { isHovered = true; });
  reviewsWrapper.addEventListener('mouseleave', () => {
    if (!isDragging) isHovered = false;
  });
  reviewsWrapper.addEventListener('focusin', () => { isHovered = true; });
  reviewsWrapper.addEventListener('focusout', () => {
    if (!isDragging) isHovered = false;
  });

  // Navegação por teclado
  reviewsWrapper.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      offset += 60;
      const halfWidth = getHalfWidth();
      if (halfWidth > 0 && offset >= halfWidth) offset -= halfWidth;
      reviewsTrack.style.transform = `translate3d(-${offset}px, 0, 0)`;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      offset -= 60;
      const halfWidth = getHalfWidth();
      if (halfWidth > 0 && offset < 0) offset += halfWidth;
      reviewsTrack.style.transform = `translate3d(-${offset}px, 0, 0)`;
    }
  });

  // Suporte nativo a Dragging (Mouse & Touch)
  const onDragStart = (clientX) => {
    isDragging = true;
    startX = clientX;
    dragStartOffset = offset;
    reviewsWrapper.classList.add('is-dragging');
  };

  const onDragMove = (clientX) => {
    if (!isDragging) return;
    const diff = startX - clientX;
    offset = dragStartOffset + diff;
    const halfWidth = getHalfWidth();
    if (halfWidth > 0) {
      if (offset >= halfWidth) offset -= halfWidth;
      if (offset < 0) offset += halfWidth;
    }
    reviewsTrack.style.transform = `translate3d(-${offset}px, 0, 0)`;
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    reviewsWrapper.classList.remove('is-dragging');
  };

  reviewsWrapper.addEventListener('mousedown', (e) => onDragStart(e.clientX));
  window.addEventListener('mousemove', (e) => onDragMove(e.clientX));
  window.addEventListener('mouseup', onDragEnd);

  reviewsWrapper.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) onDragStart(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) onDragMove(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', onDragEnd);
}

/* 8. CATÁLOGO DE ALOJAMENTOS: GALERIA MULTI-FOTO & FILTRO POR HÓSPEDES */

// 8.1 Funções Globais de Navegação de Fotos nos Cartões
window.changeCardPhoto = function(cardId, direction) {
  const card = document.getElementById(cardId) || document.querySelector('#' + cardId);
  if (!card) return;

  const gallery = card.querySelector('.card-media-gallery') || card;
  let photos = [];
  try {
    const rawData = gallery.getAttribute('data-photos') || card.getAttribute('data-photos');
    if (rawData) photos = JSON.parse(rawData);
  } catch (e) {
    console.error('Erro ao processar fotografias do alojamento:', e);
    return;
  }

  if (!photos || !photos.length) return;

  let currentIdx = parseInt(gallery.getAttribute('data-current-idx') || '0', 10);
  if (isNaN(currentIdx)) currentIdx = 0;

  const total = photos.length;
  currentIdx = (currentIdx + direction + total) % total;
  gallery.setAttribute('data-current-idx', currentIdx);

  const photo = photos[currentIdx];
  const imgEl = card.querySelector('.card-hero-img') || document.getElementById(`img-${cardId}`);
  const counterEl = card.querySelector('.gallery-counter-pill') || document.getElementById(`counter-${cardId}`);
  const captionTextEl = card.querySelector('.gallery-caption-text');

  if (imgEl) {
    imgEl.style.transition = 'opacity 0.15s ease';
    imgEl.style.opacity = '0.35';
    setTimeout(() => {
      imgEl.src = photo.src;
      imgEl.alt = photo.caption || card.querySelector('.card-title')?.textContent || '';
      imgEl.style.opacity = '1';
    }, 110);
  }

  if (counterEl) {
    counterEl.textContent = `${currentIdx + 1} / ${total}`;
  }

  if (captionTextEl) {
    captionTextEl.textContent = photo.caption || '';
  }
};

window.openGalleryLightbox = function(cardId) {
  const card = document.getElementById(cardId) || document.querySelector('#' + cardId);
  if (!card) return;

  const gallery = card.querySelector('.card-media-gallery') || card;
  let photos = [];
  try {
    const rawData = gallery.getAttribute('data-photos') || card.getAttribute('data-photos');
    if (rawData) photos = JSON.parse(rawData);
  } catch (e) {
    return;
  }

  if (!photos || !photos.length) return;

  let currentIdx = parseInt(gallery.getAttribute('data-current-idx') || '0', 10);
  if (isNaN(currentIdx)) currentIdx = 0;

  const photo = photos[currentIdx];
  const lightboxModal = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');

  if (!lightboxModal || !lightboxImg) return;

  lightboxImg.src = photo.src;
  lightboxImg.alt = photo.caption || card.querySelector('.card-title')?.textContent || '';
  if (lightboxCaption) {
    lightboxCaption.textContent = photo.caption || '';
  }

  lightboxModal.classList.add('is-open');
  lightboxModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

function initAccommodationsInteractions() {
  const lightboxModal = document.getElementById('galleryLightbox');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('is-open');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  // Gestos de Deslize (Touch Swipe) para Mobile nos Cartões
  document.querySelectorAll('.card-media-gallery').forEach(gallery => {
    const card = gallery.closest('.accommodation-card');
    if (!card) return;
    const cardId = card.id;

    let touchStartX = 0;
    let touchStartY = 0;

    gallery.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    gallery.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX < 0) {
            window.changeCardPhoto(cardId, 1);
          } else {
            window.changeCardPhoto(cardId, -1);
          }
        }
      }
    }, { passive: true });
  });

  // 8.2 Filtro Inteligente por Número de Hóspedes (Dropdown Compacto & Concierge)
  const selectEl = document.getElementById('guest-filter-select');
  const pillBtns = document.querySelectorAll('.guest-pill-btn');
  const counterEl = document.getElementById('active-units-count');
  const contextTextEl = document.getElementById('filter-context-text');
  const gridContainer = document.getElementById('accommodations-unified-grid');
  const allCards = Array.from(document.querySelectorAll('.accommodation-card'));

  if (!allCards.length) return;

  const messagesByCount = {
    'all': 'A apresentar todas as 9 habitações da quinta. Selecione o número de hóspedes para ver primeiro as habitações ideais.',
    '1': 'A apresentar 6 habitações intimistas ideais para retiro individual ou descanso a solo.',
    '2': 'A apresentar 6 refúgios perfeitos para estadias a dois (suites senhoriais e casas de pedra).',
    '3': 'A apresentar 2 habitações com cama extra ou múltiplos quartos ideais para 3 pessoas.',
    '4': 'A apresentar 3 habitações com quartos independentes e sala, ideais para famílias de 4.',
    '5': 'A apresentar 2 casas de campo amplas (T3 e T4) com pátio privativo para 5 pessoas.',
    '6': 'A apresentar 2 casas completas (Casa do Telheiro e Casa do Olival) com capacidade para 6.',
    '7': 'A apresentar a Casa do Olival (T4 completo com 4 quartos e lareira), ideal para 7 pessoas.',
    '8': 'A apresentar a Casa do Olival (T4 completo com 4 quartos, 3 casas de banho e amplo terraço) para 8 pessoas.'
  };

  function applyGuestFilter(guestVal) {
    let visibleCount = 0;

    if (guestVal === 'all') {
      allCards.forEach(card => {
        card.classList.remove('is-hidden');
        card.classList.remove('is-optimal-fit');
        visibleCount++;
      });

      if (counterEl) counterEl.textContent = '9 Habitações Disponíveis';
      if (contextTextEl) contextTextEl.textContent = messagesByCount['all'];

    } else {
      const guestNum = parseInt(guestVal, 10);

      // Classificar cartões entre correspondentes e não-correspondentes
      const matchingCards = [];
      const nonMatchingCards = [];

      allCards.forEach(card => {
        const min = parseInt(card.getAttribute('data-min-guests') || '1', 10);
        const max = parseInt(card.getAttribute('data-max-guests') || '8', 10);
        const optimal = parseInt(card.getAttribute('data-optimal') || '2', 10);

        if (guestNum >= min && guestNum <= max) {
          card.classList.remove('is-hidden');
          if (guestNum === optimal) {
            card.classList.add('is-optimal-fit');
          } else {
            card.classList.remove('is-optimal-fit');
          }
          matchingCards.push(card);
          visibleCount++;
        } else {
          card.classList.add('is-hidden');
          card.classList.remove('is-optimal-fit');
          nonMatchingCards.push(card);
        }
      });

      // Reordenar no DOM: cartões com capacidade ideal aparecem primeiro
      if (gridContainer && matchingCards.length) {
        matchingCards.sort((a, b) => {
          const aOpt = a.classList.contains('is-optimal-fit') ? 1 : 0;
          const bOpt = b.classList.contains('is-optimal-fit') ? 1 : 0;
          return bOpt - aOpt;
        });
        matchingCards.forEach(c => gridContainer.appendChild(c));
        nonMatchingCards.forEach(c => gridContainer.appendChild(c));
      }

      // Atualizar textos e contador
      if (counterEl) {
        counterEl.textContent = `${visibleCount} ${visibleCount === 1 ? 'Habitação Disponível' : 'Habitações Disponíveis'}`;
      }
      if (contextTextEl) {
        contextTextEl.textContent = messagesByCount[guestVal] || `A apresentar as habitações adequadas para ${guestNum} hóspedes.`;
      }
    }
  }

  // Listener para o dropdown compacto
  if (selectEl) {
    selectEl.addEventListener('change', (e) => {
      applyGuestFilter(e.target.value);
    });
  }

  // Listener retrocompatível para pills (caso existam)
  if (pillBtns.length) {
    pillBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const guestVal = btn.getAttribute('data-guests');
        pillBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        applyGuestFilter(guestVal);
        if (selectEl) selectEl.value = guestVal;
      });
    });
  }
}

/* 9. PAINEL DE NAVEGAÇÃO LATERAL (LUXURY SLIDE-IN DRAWER) */
function initNavDrawer() {
  const openBtns = document.querySelectorAll('.js-drawer-open');
  const closeBtns = document.querySelectorAll('.js-drawer-close');
  const drawer = document.getElementById('main-drawer');
  const backdrop = document.querySelector('.nav-drawer-backdrop');

  if (!openBtns.length || !drawer) return;

  function openDrawer() {
    document.body.classList.add('nav-drawer-open');
    drawer.setAttribute('aria-hidden', 'false');
    openBtns.forEach(btn => btn.setAttribute('aria-expanded', 'true'));
  }

  function closeDrawer() {
    document.body.classList.remove('nav-drawer-open');
    drawer.setAttribute('aria-hidden', 'true');
    openBtns.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (document.body.classList.contains('nav-drawer-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isFullyOpen) {
      closeDrawer();
    }
  });
}

/* 9. FILTRO DUPLO DE ATIVIDADES (ÉPOCA DO ANO X EXPERIÊNCIA) */
function initActivitiesFilter() {
  const seasonSelect = document.getElementById('season-filter-select');
  const categorySelect = document.getElementById('category-filter-select');
  const countBadge = document.getElementById('activities-count-badge');
  const cards = document.querySelectorAll('.activities-grid .activity-card');

  if (!seasonSelect || !categorySelect || !cards.length) return;

  function filterActivities() {
    const selectedSeason = seasonSelect.value;
    const selectedCategory = categorySelect.value;
    let visibleCount = 0;

    cards.forEach(card => {
      const cardSeason = card.getAttribute('data-season') || 'all';
      const cardCategory = card.getAttribute('data-category') || 'all';

      // Avaliação de Época: se selecionada época específica, correspondem atividades da época ou de ano inteiro ('all')
      const seasonMatches = (selectedSeason === 'all') || (cardSeason === selectedSeason) || (cardSeason === 'all');

      // Avaliação de Categoria
      const categoryMatches = (selectedCategory === 'all') || (cardCategory === selectedCategory);

      if (seasonMatches && categoryMatches) {
        card.classList.remove('is-hidden');
        visibleCount++;
      } else {
        card.classList.add('is-hidden');
      }
    });

    if (countBadge) {
      if (visibleCount === 1) {
        countBadge.textContent = '1 Experiência Disponível';
      } else {
        countBadge.textContent = `${visibleCount} Experiências Disponíveis`;
      }
    }
  }

  seasonSelect.addEventListener('change', filterActivities);
  categorySelect.addEventListener('change', filterActivities);
}

/* 10. SCROLL SUAVE & DESTAQUE DINÂMICO NA TABELA DE PREÇOS */
function initPricingTableAnchor() {
  const tableRows = document.querySelectorAll('.pricing-table tbody tr.pricing-row');

  // Ao passar o rato numa linha, esta torna-se a linha ativa (o botão surge nela e oculta-se nas outras)
  tableRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      tableRows.forEach(r => r.classList.remove('active-row'));
      row.classList.add('active-row');
    });
  });

  // Ao clicar em 'Preço' num cartão de alojamento
  document.querySelectorAll('a[href="#tabela-precos"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTable = document.getElementById('tabela-precos');
      const targetRowId = anchor.getAttribute('data-target-row');

      if (targetTable) {
        const headerOffset = 70;
        const elementPosition = targetTable.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        if (targetRowId) {
          const targetRow = document.getElementById(targetRowId);
          if (targetRow) {
            tableRows.forEach(r => r.classList.remove('active-row', 'row-just-highlighted'));
            targetRow.classList.add('active-row', 'row-just-highlighted');
            setTimeout(() => {
              targetRow.classList.remove('row-just-highlighted');
            }, 1600);
          }
        }
      }
    });
  });
}

/* 11. ACORDEÃO DE DÚVIDAS / FAQS (TODAS FECHADAS DE INÍCIO & TOGGLE EXCLUSIVO) */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-accordion .faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Fecha todos os itens para manter leitura focada e coesa
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('open');
      });

      // Se não estava aberto, abre
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* 12. MODAL DE POLÍTICA DE PRIVACIDADE & RGPD */
function initLegalModal() {
  const legalTriggers = document.querySelectorAll('.legal-modal-trigger');
  if (!legalTriggers.length) return;

  legalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal();
    });
  });
}

function openLegalModal() {
  let modal = document.getElementById('privacyLegalModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'privacyLegalModal';
    modal.className = 'modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div class="modal-card" style="max-width: 580px; text-align: left;">
        <button type="button" class="modal-close-btn" id="privacyModalClose" aria-label="Fechar Janela">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div style="margin-bottom: 20px;">
          <span style="font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-accent-gold);">Privacidade &amp; RGPD</span>
          <h3 style="font-family: var(--font-serif); font-size: 1.8rem; margin: 4px 0 0 0; color: var(--color-text-main);">Política de Privacidade</h3>
        </div>
        <div style="font-size: 0.94rem; color: #5A534B; line-height: 1.65;">
          <p style="margin-bottom: 12px;">Em estrita conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD), a Casa Grande assegura a total confidencialidade e salvaguarda dos dados pessoais dos seus hóspedes:</p>
          <ul style="margin: 0 0 16px 20px; padding: 0;">
            <li style="margin-bottom: 8px;"><strong>Finalidade Estrita:</strong> Os dados facultados (nome, e-mail, telemóvel e dados de faturação) são utilizados exclusivamente para a confirmação de reservas, emissão de faturas e coordenação do acolhimento em Paços da Serra.</li>
            <li style="margin-bottom: 8px;"><strong>Confidencialidade Absoluta:</strong> A Casa Grande não comercializa nem partilha informações com quaisquer entidades terceiras.</li>
            <li style="margin-bottom: 8px;"><strong>Direitos do Titular:</strong> O hóspede pode a qualquer momento consultar, retificar ou solicitar a eliminação dos seus dados contactando diretamente a receção através do e-mail <code>info@casagrande.com.pt</code>.</li>
          </ul>
          <p style="font-size: 0.85rem; color: var(--color-text-muted); margin: 0; padding-top: 12px; border-top: 1px solid var(--border-delicate);">
            Turismo de Habitação &amp; Casas de Campo — Paços da Serra, Gouveia, Serra da Estrela.
          </p>
        </div>
        <div style="margin-top: 24px; text-align: right;">
          <button type="button" class="btn-confirm-booking" id="privacyModalBtnOk" style="width: auto; padding: 10px 24px; display: inline-flex; font-size: 0.88rem;">Compreendido</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeModal = () => {
      modal.classList.remove('active');
    };

    modal.querySelector('#privacyModalClose').addEventListener('click', closeModal);
    modal.querySelector('#privacyModalBtnOk').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
  }

  modal.classList.add('active');
}



