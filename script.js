const work = document.getElementById("work");
const filters = [...document.querySelectorAll(".filter")];
const aboutButton = document.getElementById("about");
const contactsButton = document.getElementById("contacts");
const sticker = document.querySelector(".sticker");
const contactBand = document.querySelector(".contact-band");
const projectBand = document.querySelector(".project-band");
let openTitle = null;

let figures = [];
const motions = new WeakMap();

function stopMotion(el) {
  const id = motions.get(el);
  if (id) cancelAnimationFrame(id);
  motions.delete(el);
}

function glide(el, from, to, write, duration = 550) {
  stopMotion(el);
  if (Math.abs(from - to) < 0.5) {
    write(to);
    return;
  }
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - (1 - t) ** 3;
    write(from + (to - from) * eased);
    if (t < 1) motions.set(el, requestAnimationFrame(tick));
    else {
      write(to);
      motions.delete(el);
    }
  };
  motions.set(el, requestAnimationFrame(tick));
}

function readShift(el) {
  const transform = getComputedStyle(el).transform;
  if (!transform || transform === "none") return 0;
  return new DOMMatrix(transform).m41;
}

function isVideo(src) {
  return /\.(mp4|webm|mov)(\?|#|$)/i.test(src);
}

function filesOf(project) {
  if (Array.isArray(project.media) && project.media.length) return project.media;
  if (project.src) return [project.src];
  return [];
}

function isPhone() {
  return window.matchMedia("(max-width: 800px)").matches;
}

function labelEdges() {
  const name = document.querySelector(".name");
  const dock = document.querySelector(".dock");
  const about = document.getElementById("about");
  const contacts = document.getElementById("contacts");
  const top = Math.max(
    name?.getBoundingClientRect().bottom || 0,
    dock?.getBoundingClientRect().bottom || 0
  );
  const bottom = Math.min(
    about?.getBoundingClientRect().top || window.innerHeight,
    contacts?.getBoundingClientRect().top || window.innerHeight
  );
  return { top, bottom };
}

function rowHeight() {
  if (isPhone()) {
    const caption = 46;
    const gap = 8;
    const { top, bottom } = labelEdges();
    return Math.max(160, Math.floor(bottom - top - gap * 2 - caption));
  }
  const previous = Math.max(240, window.innerHeight - 260);
  const wanted = Math.round(previous * 1.2);
  const minBand = 166;
  return Math.max(240, Math.min(wanted, window.innerHeight - minBand));
}

function placeRow() {
  if (isPhone()) {
    const { top } = labelEdges();
    work.style.paddingTop = `${Math.round(top + 8)}px`;
    return;
  }
  const caption = 26;
  const space = window.innerHeight;
  const gap = Math.max(0, (space - (rowHeight() + caption)) / 2);
  work.style.paddingTop = `${Math.round(gap)}px`;
}

function createMedia(src, caption) {
  if (isVideo(src)) {
    const video = document.createElement("video");
    video.src = src;
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = "auto";
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    const start = () => {
      video.play().catch(() => {});
    };
    video.addEventListener("loadeddata", start);
    video.addEventListener("canplay", start);
    return video;
  }

  const img = document.createElement("img");
  img.src = src;
  img.alt = caption || "";
  return img;
}

function mediaSize(slide) {
  const image = slide.querySelector("img");
  const video = slide.querySelector("video");
  if (image) return { width: image.naturalWidth, height: image.naturalHeight, el: image, event: "load" };
  if (video) return { width: video.videoWidth, height: video.videoHeight, el: video, event: "loadedmetadata" };
  return null;
}

function setWidth(el, width, animate) {
  if (!el) return;
  if (!animate) {
    stopMotion(el);
    el.style.width = `${width}px`;
    return;
  }
  glide(el, el.getBoundingClientRect().width, width, (value) => {
    el.style.width = `${value}px`;
  });
}

function setShift(track, offset, animate) {
  const to = -offset;
  if (!animate) {
    stopMotion(track);
    track.style.transform = `translateX(${to}px)`;
    return;
  }
  glide(track, readShift(track), to, (value) => {
    track.style.transform = `translateX(${value}px)`;
  });
}

function fitInBox(aspect, maxW, maxH) {
  let width = maxW;
  let height = width / aspect;
  if (height > maxH) {
    height = maxH;
    width = height * aspect;
  }
  return { width, height };
}

function layoutPhone(piece, animate) {
  const edges = labelEdges();
  const gap = 8;
  const maxW = Math.max(120, window.innerWidth - 32);
  work.style.paddingTop = `${Math.round(edges.top + gap)}px`;
  work.style.paddingBottom = `${Math.round(window.innerHeight - edges.bottom + gap)}px`;

  const slides = [...piece.querySelectorAll(".slide")];
  const figure = piece.closest("figure");
  const frame = piece.querySelector(".frame");
  const track = piece.querySelector(".track");
  const index = Number(piece.dataset.index || 0);
  const fromWidth = frame.getBoundingClientRect().width;
  const fromOffset = -readShift(track);
  let budget = 26;
  let sizes = [];
  let active = { width: maxW, height: maxW };
  let offset = 0;

  for (let pass = 0; pass < 4; pass += 1) {
    const maxH = Math.max(120, edges.bottom - edges.top - gap * 2 - budget);
    sizes = slides.map((slide) => {
      const media = mediaSize(slide);
      if (!media || !media.width || !media.height) {
        if (media?.el && !media.el.dataset.fitWait) {
          media.el.dataset.fitWait = "1";
          media.el.addEventListener(media.event, () => layoutSlides(piece), { once: true });
        }
        return fitInBox(0.75, maxW, maxH);
      }
      return fitInBox(media.width / media.height, maxW, maxH);
    });

    sizes.forEach((size, i) => {
      slides[i].style.width = `${size.width}px`;
      slides[i].style.height = `${size.height}px`;
    });

    active = sizes[index] || { width: maxW, height: maxH };
    offset = sizes.slice(0, index).reduce((sum, size) => sum + size.width, 0);
    piece.style.setProperty("--slide-h", `${active.height}px`);
    frame.style.height = "";
    piece.style.height = "";
    figure.style.height = "";
    setWidth(frame, active.width, false);
    setWidth(piece, active.width, false);
    setWidth(figure, active.width, false);

    const caption = figure.querySelector(".caption");
    const used = caption ? Math.ceil(caption.getBoundingClientRect().height) : 0;
    if (used <= budget + 1) break;
    budget = used;
  }

  const ease = Boolean(animate && fromWidth > 1);
  if (ease) {
    setWidth(frame, fromWidth, false);
    setWidth(piece, fromWidth, false);
    setWidth(figure, fromWidth, false);
    setShift(track, fromOffset, false);
  }
  setWidth(frame, active.width, ease);
  setWidth(piece, active.width, ease);
  setWidth(figure, active.width, ease);
  setShift(track, offset, ease);
}

function layoutSlides(piece, animate) {
  if (isPhone()) {
    layoutPhone(piece, animate);
    return;
  }

  placeRow();
  work.style.paddingBottom = "";
  piece.style.height = "";
  piece.querySelector(".frame").style.height = "";
  piece.closest("figure").style.height = "";
  piece.querySelectorAll(".slide").forEach((slide) => {
    slide.style.height = "";
  });

  const height = rowHeight();
  piece.style.setProperty("--slide-h", `${height}px`);

  const widths = [...piece.querySelectorAll(".slide")].map((slide) => {
    const media = mediaSize(slide);
    if (!media || !media.width || !media.height) {
      if (media?.el) {
        media.el.addEventListener(media.event, () => layoutSlides(piece), { once: true });
      }
      return height * 0.7;
    }
    return height * (media.width / media.height);
  });

  widths.forEach((width, i) => {
    const slide = piece.querySelectorAll(".slide")[i];
    slide.style.width = `${width}px`;
  });

  const index = Number(piece.dataset.index || 0);
  const offset = widths.slice(0, index).reduce((sum, width) => sum + width, 0);
  const active = widths[index] || height * 0.7;
  const frame = piece.querySelector(".frame");
  const figure = piece.closest("figure");

  setWidth(frame, active, animate);
  setWidth(piece, active, animate);
  setWidth(figure, active, animate);
  setShift(piece.querySelector(".track"), offset, animate);
}

function updatePages(piece) {
  const index = Number(piece.dataset.index || 0);
  piece.querySelectorAll(".pages button").forEach((button, i) => {
    const current = i === index;
    button.classList.toggle("is-current", current);
    if (current) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  });
}

function showSlide(piece, index, animate) {
  const slides = [...piece.querySelectorAll(".slide")];
  if (!slides.length) return;

  const next = Math.max(0, Math.min(index, slides.length - 1));
  const changed = next !== Number(piece.dataset.index || 0);
  piece.dataset.index = String(next);

  slides.forEach((slide, i) => {
    const video = slide.querySelector("video");
    if (!video) return;
    if (i === next) video.play().catch(() => {});
    else video.pause();
  });

  layoutSlides(piece, Boolean(animate && changed));
  updatePages(piece);
}

function render() {
  work.replaceChildren();

  projects.forEach((project) => {
    const files = filesOf(project);
    if (!files.length) return;

    const figure = document.createElement("figure");
    figure.dataset.category = project.category || "editorial";

    const piece = document.createElement("div");
    piece.className = "piece";
    piece.dataset.index = "0";

    const frame = document.createElement("div");
    frame.className = "frame";

    const track = document.createElement("div");
    track.className = "track";

    files.forEach((src) => {
      const slide = document.createElement("div");
      slide.className = "slide";
      slide.appendChild(createMedia(src, project.caption));
      track.appendChild(slide);
    });

    frame.appendChild(track);

    if (files.length > 1) {
      const pages = document.createElement("div");
      pages.className = "pages";
      files.forEach((_, i) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "page";
        button.textContent = String(i + 1);
        button.setAttribute("aria-label", `Image ${i + 1}`);
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          resetOthers(figure);
          showSlide(piece, i, true);
        });
        pages.appendChild(button);
      });
      frame.appendChild(pages);
      frame.classList.add("is-multi");
      frame.addEventListener("click", (event) => {
        if (event.target.closest(".pages") || event.target.closest(".caption-note")) return;
        resetOthers(figure);
        const count = files.length;
        const index = Number(piece.dataset.index || 0);
        showSlide(piece, (index + 1) % count, true);
      });
    }

    piece.appendChild(frame);

    const captionText = (project.caption || "").trim();
    const description = (project.description || "").trim();

    figure.appendChild(piece);

    if (captionText || description) {
      const caption = document.createElement("figcaption");
      caption.className = "caption";
      if (captionText) {
        const title = document.createElement(description ? "button" : "span");
        title.className = "caption-title";
        title.textContent = captionText;
        if (description) {
          title.type = "button";
          title.setAttribute("aria-expanded", "false");
          title.addEventListener("click", () => {
            resetOthers(figure);
            showProjectDescription(description, title, figure.dataset.category);
          });
          caption.append(title);
        } else {
          caption.append(title);
        }
      }
      figure.appendChild(caption);
    }

    work.appendChild(figure);
    showSlide(piece, 0);
  });

  figures = [...work.querySelectorAll("figure")];
}

function applyFilter(category) {
  hideProjectBand();
  filters.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === category);
  });
  figures.forEach((figure) => {
    figure.hidden = figure.dataset.category !== category;
  });
}

function layoutAll() {
  document.querySelectorAll(".piece").forEach((piece) => {
    showSlide(piece, Number(piece.dataset.index || 0));
  });
}

function resetOthers(currentFigure) {
  document.querySelectorAll("figure").forEach((figure) => {
    if (figure === currentFigure) return;
    const piece = figure.querySelector(".piece");
    if (piece && Number(piece.dataset.index || 0) !== 0) {
      showSlide(piece, 0, true);
    }
  });
  if (openTitle && openTitle.closest("figure") !== currentFigure) {
    hideProjectBand();
  }
}

let bandTimer = 0;

function hideProjectBand() {
  if (openTitle) {
    openTitle.setAttribute("aria-expanded", "false");
    openTitle = null;
  }
  if (projectBand.hidden || projectBand.classList.contains("is-leaving")) return;
  projectBand.classList.add("is-leaving");
  clearTimeout(bandTimer);
  bandTimer = setTimeout(() => {
    if (!projectBand.classList.contains("is-leaving")) return;
    projectBand.hidden = true;
    projectBand.textContent = "";
    projectBand.classList.remove("is-leaving");
  }, 300);
}

function hideAbout() {
  sticker.hidden = true;
  aboutButton.setAttribute("aria-expanded", "false");
}

function hideContacts() {
  contactBand.hidden = true;
  contactsButton.setAttribute("aria-expanded", "false");
}

function showProjectDescription(text, title, category) {
  if (openTitle === title && !projectBand.hidden && !projectBand.classList.contains("is-leaving")) {
    hideProjectBand();
    return;
  }
  clearTimeout(bandTimer);
  projectBand.classList.remove("is-leaving");
  hideAbout();
  hideContacts();
  if (openTitle && openTitle !== title) {
    openTitle.setAttribute("aria-expanded", "false");
  }
  projectBand.dataset.category = category || "editorial";
  projectBand.textContent = text;
  projectBand.hidden = false;
  title.setAttribute("aria-expanded", "true");
  openTitle = title;
}

function toggleAbout() {
  const open = sticker.hidden;
  if (open) {
    hideProjectBand();
    hideContacts();
  }
  sticker.hidden = !open;
  aboutButton.setAttribute("aria-expanded", String(open));
}

function toggleContacts() {
  const open = contactBand.hidden;
  if (open) {
    hideProjectBand();
    hideAbout();
  }
  contactBand.hidden = !open;
  contactsButton.setAttribute("aria-expanded", String(open));
}

filters.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.filter));
});

aboutButton.addEventListener("click", toggleAbout);
contactsButton.addEventListener("click", toggleContacts);

sticker.addEventListener("click", hideAbout);
contactBand.addEventListener("click", (event) => {
  if (event.target.closest("a")) return;
  hideContacts();
});

projectBand.addEventListener("click", hideProjectBand);

document.addEventListener("click", (event) => {
  if (projectBand.hidden || projectBand.classList.contains("is-leaving")) return;
  if (event.target.closest(".project-band")) return;
  const figure = event.target.closest("figure");
  if (openTitle && figure === openTitle.closest("figure")) return;
  if (figure) return;
  hideProjectBand();
});

work.addEventListener(
  "wheel",
  (event) => {
    if (isPhone()) return;
    const note = event.target.closest?.(".caption-note");
    if (note && note.scrollHeight > note.clientHeight + 2) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    work.scrollLeft += event.deltaY;
    event.preventDefault();
  },
  { passive: false }
);

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("resize", layoutAll);

render();
applyFilter("editorial");

window.addEventListener("load", () => {
  work.scrollLeft = 0;
  layoutAll();
});
