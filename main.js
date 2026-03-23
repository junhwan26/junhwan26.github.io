const { siteData } = window;

document.documentElement.lang = siteData.page.language;
document.title = siteData.page.title;
document.getElementById("site-title").textContent = siteData.profile.name;

const descriptionMeta = document.querySelector('meta[name="description"]');
if (descriptionMeta) {
  descriptionMeta.setAttribute("content", siteData.page.description);
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) {
    node.className = className;
  }
  if (text) {
    node.textContent = text;
  }
  return node;
}

function link(label, href, className) {
  const anchor = el("a", className, label);
  anchor.href = href;
  anchor.target = href.startsWith("#") || href.startsWith("mailto:") ? "_self" : "_blank";
  if (anchor.target === "_blank") {
    anchor.rel = "noreferrer";
  }
  return anchor;
}

function linkWithIcon(item, className) {
  const iconClassMap = {
    file: "fa-regular fa-file-lines",
    mail: "fa-regular fa-envelope",
    linkedin: "fa-brands fa-linkedin",
  };

  const anchor = document.createElement("a");
  anchor.className = className;
  anchor.href = item.href;
  anchor.target = item.href.startsWith("#") || item.href.startsWith("mailto:") ? "_self" : "_blank";
  if (anchor.target === "_blank") {
    anchor.rel = "noreferrer";
  }

  if (item.icon) {
    const icon = document.createElement("i");
    icon.className = `${iconClassMap[item.icon] || ""} link-icon`;
    icon.setAttribute("aria-hidden", "true");
    anchor.appendChild(icon);
  }

  anchor.appendChild(el("span", "link-text", item.label));
  return anchor;
}

function tagToneClass(tagText) {
  const normalized = tagText.trim().toLowerCase();
  let hash = 0;

  for (let i = 0; i < normalized.length; i += 1) {
    hash = (hash * 31 + normalized.charCodeAt(i)) >>> 0;
  }

  return `tag--tone-${(hash % 6) + 1}`;
}

function resourceLink(item) {
  const isGitHub = item.href.includes("github.com") || item.label.toLowerCase() === "github";
  const anchor = document.createElement("a");
  anchor.className = `text-link${isGitHub ? " text-link--github" : ""}`;
  anchor.href = item.href;
  anchor.target = item.href.startsWith("#") || item.href.startsWith("mailto:") ? "_self" : "_blank";
  if (anchor.target === "_blank") {
    anchor.rel = "noreferrer";
  }

  const icon = document.createElement("i");
  icon.className = isGitHub
    ? "fa-brands fa-github text-link__icon"
    : "fa-solid fa-arrow-up-right-from-square text-link__icon";
  icon.setAttribute("aria-hidden", "true");
  anchor.appendChild(icon);
  anchor.appendChild(el("span", "", item.label));
  return anchor;
}

function renderAvatar() {
  const avatar = document.getElementById("avatar");
  if (siteData.profile.photo) {
    const img = document.createElement("img");
    img.src = siteData.profile.photo;
    img.alt = siteData.profile.photoAlt || siteData.profile.name;
    avatar.appendChild(img);
    return;
  }

  avatar.textContent = siteData.profile.initials;
}

function renderProfile() {
  const eyebrow = document.getElementById("profile-eyebrow");
  eyebrow.textContent = siteData.profile.eyebrow;
  eyebrow.hidden = !siteData.profile.eyebrow;
  document.getElementById("profile-name").textContent = siteData.profile.name;
  document.getElementById("profile-role").textContent = siteData.profile.role;
  const profileBio = document.getElementById("profile-bio");
  profileBio.textContent = siteData.profile.bio;
  profileBio.hidden = !siteData.profile.bio;

  const meta = document.getElementById("profile-meta");
  [
    {
      icon: "fa-solid fa-location-dot",
      text: siteData.profile.location,
      href: "",
    },
    {
      icon: "fa-solid fa-building-columns",
      text: siteData.profile.affiliation,
      href: "",
    },
    {
      icon: "fa-regular fa-envelope",
      text: siteData.profile.email,
      href: `mailto:${siteData.profile.email}`,
    },
  ].filter((item) => item.text).forEach((item) => {
    const li = document.createElement("li");
    const icon = document.createElement("i");
    icon.className = `${item.icon} meta-icon`;
    icon.setAttribute("aria-hidden", "true");
    li.appendChild(icon);

    if (item.href) {
      li.appendChild(link(item.text, item.href, "meta-link"));
    } else {
      li.appendChild(el("span", "meta-text", item.text));
    }
    meta.appendChild(li);
  });

  const actionRow = document.getElementById("action-row");
  siteData.profile.primaryLinks.forEach((item) => {
    const className = item.style === "primary" ? "button button--primary" : "button button--secondary";
    actionRow.appendChild(linkWithIcon(item, className));
  });
  actionRow.hidden = siteData.profile.primaryLinks.length === 0;

  const socialRow = document.getElementById("social-row");
  siteData.profile.socialLinks.forEach((item) => {
    socialRow.appendChild(link(item.label, item.href, "pill"));
  });
  socialRow.hidden = siteData.profile.socialLinks.length === 0;

  renderAvatar();
}

function renderIntro() {
  const introLabel = document.querySelector("#intro-card .section-label");
  const introHeadline = document.getElementById("intro-headline");
  introHeadline.textContent = siteData.intro.headline;
  introHeadline.hidden = !siteData.intro.headline;
  introLabel.hidden = !siteData.intro.headline;

  const introCopy = document.getElementById("intro-copy");
  siteData.intro.paragraphs.forEach((paragraph) => {
    introCopy.appendChild(el("p", "", paragraph));
  });

  const focusList = document.getElementById("focus-list");
  siteData.intro.focusItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.appendChild(el("span", "", `0${index + 1}`));
    li.appendChild(el("span", "", item));
    focusList.appendChild(li);
  });
  focusList.hidden = siteData.intro.focusItems.length === 0;
}

function toggleSection(sectionId, hasContent) {
  const section = document.getElementById(sectionId);
  section.hidden = !hasContent;
}

function renderTimeline(items, targetId, secondaryKey) {
  const target = document.getElementById(targetId);

  items.forEach((item) => {
    const card = el("article", "timeline-item");
    const topline = el("div", "item-topline");

    topline.appendChild(el("h3", "item-title", item.title));
    topline.appendChild(el("span", "item-period", item.period));
    card.appendChild(topline);

    if (item[secondaryKey]) {
      card.appendChild(el("p", "item-subtitle", item[secondaryKey]));
    }

    if (item.description) {
      card.appendChild(el("p", "item-copy", item.description));
    }

    if (item.highlights?.length) {
      const list = el("ul", "item-list");
      item.highlights.forEach((highlight) => {
        const li = el("li", "item-list__entry", highlight);
        list.appendChild(li);
      });
      card.appendChild(list);
    }

    if (item.tags?.length) {
      const tagRow = el("div", "tag-row");
      item.tags.forEach((tagText) => {
        tagRow.appendChild(el("span", `tag ${tagToneClass(tagText)}`, tagText));
      });
      card.appendChild(tagRow);
    }

    target.appendChild(card);
  });
}

function renderStack(items, targetId, subtitleBuilder) {
  const target = document.getElementById(targetId);

  items.forEach((item) => {
    const card = el("article", targetId === "project-list" ? "project-card" : "work-card");
    const topline = el("div", "item-topline");
    topline.appendChild(el("h3", "item-title", item.title));
    if (item.period) {
      topline.appendChild(el("span", "item-period", item.period));
    }
    card.appendChild(topline);

    const subtitle = subtitleBuilder(item);
    if (subtitle) {
      card.appendChild(el("p", "item-subtitle", subtitle));
    }

    if (item.description) {
      card.appendChild(el("p", "item-copy", item.description));
    }

    if (item.highlights?.length) {
      const list = el("ul", "item-list");
      item.highlights.forEach((highlight) => {
        const li = el("li", "item-list__entry", highlight);
        list.appendChild(li);
      });
      card.appendChild(list);
    }

    if (item.tags?.length) {
      const tagRow = el("div", "tag-row");
      item.tags.forEach((tagText) => {
        tagRow.appendChild(el("span", `tag ${tagToneClass(tagText)}`, tagText));
      });
      card.appendChild(tagRow);
    }

    if (item.links?.length) {
      const linkRow = el("div", "link-row");
      item.links.forEach((itemLink) => {
        linkRow.appendChild(resourceLink(itemLink));
      });
      card.appendChild(linkRow);
    }

    target.appendChild(card);
  });
}

function renderNav() {
  const siteNav = document.getElementById("site-nav");
  const navSections = [
    { id: "education-section", label: "Education" },
    { id: "experience-section", label: "Research" },
    { id: "publication-section", label: "Publications" },
    { id: "project-section", label: "Projects" },
  ];

  navSections
    .filter((item) => {
      const section = document.getElementById(item.id);
      return section && !section.hidden;
    })
    .forEach((item) => {
      siteNav.appendChild(link(item.label, `#${item.id}`, "site-nav__link"));
    });

  siteNav.hidden = siteNav.childElementCount === 0;
}

function renderContact() {
  toggleSection("contact-section", Boolean(siteData.contact.text && siteData.contact.emailHref));
  if (!siteData.contact.text || !siteData.contact.emailHref) {
    return;
  }

  document.getElementById("contact-copy").textContent = siteData.contact.text;

  const contactLink = document.getElementById("contact-link");
  contactLink.textContent = siteData.contact.emailLabel;
  contactLink.href = siteData.contact.emailHref;
}

renderProfile();
renderIntro();
renderTimeline(siteData.education, "education-list", "institution");
toggleSection("education-section", siteData.education.length > 0);
renderTimeline(siteData.experience, "experience-list", "organization");
toggleSection("experience-section", siteData.experience.length > 0);
renderStack(
  siteData.publications,
  "publication-list",
  (item) => `${item.authors} · ${item.venue}`,
);
toggleSection("publication-section", siteData.publications.length > 0);
renderStack(
  siteData.projects,
  "project-list",
  (item) => item.subtitle,
);
toggleSection("project-section", siteData.projects.length > 0);
renderStack(
  siteData.otherExperience,
  "other-experience-list",
  (item) => item.subtitle,
);
toggleSection("other-experience-section", siteData.otherExperience.length > 0);
renderStack(
  siteData.skills,
  "skills-list",
  () => "",
);
toggleSection("skills-section", siteData.skills.length > 0);
renderContact();
renderNav();
