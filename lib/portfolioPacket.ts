export type PacketAsset = {
  id: string;
  slot: string;
  channel: string;
  status: string;
  filePath: string;
  alt: string;
  brief: string;
  prompt: string;
  reference: string;
};

export type PortfolioExportPacket = {
  version: number;
  exportedAt: string;
  sourceSlug: string;
  sourceHash: string;
  paths: {
    packet: string;
    source: string;
    portfolio: string;
    manifest: string;
    idea?: string;
  };
  meta: {
    slug: string;
    title: string;
    subtitle: string;
    summary: string;
    status: string;
    contentSource: "actual" | "generated";
    linkedIdea: string;
    portfolioPlacement: string[];
  };
  homePromotions: {
    hero: {
      enabled: boolean;
      title: string;
      subtitle: string;
      summary: string;
      detailSlug: string;
      ctaLabel: string;
      asset: PacketAsset | null;
    };
    specialLab: {
      enabled: boolean;
      title: string;
      summary: string;
      detailSlug: string;
      badge: string;
      asset: PacketAsset | null;
    };
  };
  detailPage: {
    title: string;
    subtitle: string;
    summary: string;
    contentSource: "actual" | "generated";
    intro: string;
    sections: Array<{
      id: string;
      title: string;
      body: string;
    }>;
  };
  links: {
    github: string;
    demo: string;
    brunch: string;
    portfolio: string;
    linkedin: Array<{
      slug: string;
      title: string;
      variant: string;
      status: string;
      externalUrl: string;
    }>;
    builds: Array<{
      name: string;
      displayName: string;
      artifactType: string;
      repoUrl: string;
      demoUrl: string;
      portfolioFeatured: boolean;
    }>;
  };
  assets: {
    cover: PacketAsset | null;
    portfolioHero: PacketAsset | null;
    specialLabCard: PacketAsset | null;
    inline: PacketAsset[];
    linkedin: PacketAsset[];
    all: PacketAsset[];
  };
};

const DEFAULT_SJ_TOOL_ORIGIN = "http://localhost:3000";
const DEFAULT_PACKET_SLUGS = ["2026-05-27-design-system-future"];

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export function getPortfolioPacketOrigin() {
  const rawOrigin =
    import.meta.env.VITE_SJ_TOOL_ORIGIN ||
    import.meta.env.VITE_PORTFOLIO_PACKET_ORIGIN ||
    DEFAULT_SJ_TOOL_ORIGIN;

  return trimTrailingSlash(rawOrigin.trim());
}

export function getFeaturedPacketSlugs() {
  const rawSlugs = import.meta.env.VITE_PORTFOLIO_PACKET_SLUGS;
  if (!rawSlugs) {
    return DEFAULT_PACKET_SLUGS;
  }

  return rawSlugs
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);
}

export function buildPortfolioPacketUrl(slug: string) {
  return `${getPortfolioPacketOrigin()}/api/exports/portfolio?slug=${encodeURIComponent(slug)}`;
}

export async function fetchPortfolioPacket(slug: string) {
  const response = await fetch(buildPortfolioPacketUrl(slug));
  if (!response.ok) {
    const message = await response.text().catch(() => "");
    throw new Error(message || `Failed to fetch packet: ${response.status}`);
  }
  return response.json() as Promise<PortfolioExportPacket>;
}

export function resolvePacketAssetSrc(filePath?: string | null) {
  if (!filePath) return null;

  const trimmed = filePath.trim();
  if (!trimmed) return null;

  if (/^https?:\/\//.test(trimmed)) {
    return trimmed;
  }

  const normalized = trimmed.replace(/\\/g, "/");
  const publicMatch = normalized.match(/(?:^|\/)public\/(.+)$/);
  if (publicMatch?.[1]) {
    return `/${publicMatch[1]}`;
  }

  if (normalized.startsWith("./public/")) {
    return `/${normalized.slice("./public/".length)}`;
  }

  if (normalized.startsWith("public/")) {
    return `/${normalized.slice("public/".length)}`;
  }

  if (
    normalized.startsWith("/Users/") ||
    normalized.startsWith("/private/") ||
    normalized.startsWith("/var/") ||
    normalized.startsWith("/Volumes/") ||
    normalized.startsWith("file://")
  ) {
    return null;
  }

  if (normalized.startsWith("/")) {
    return normalized;
  }

  return null;
}

export function getPacketHeroAssetSrc(packet: PortfolioExportPacket) {
  return (
    resolvePacketAssetSrc(packet.homePromotions.hero.asset?.filePath) ||
    resolvePacketAssetSrc(packet.assets.portfolioHero?.filePath) ||
    resolvePacketAssetSrc(packet.assets.cover?.filePath)
  );
}

export function getPacketSpecialLabAssetSrc(packet: PortfolioExportPacket) {
  return (
    resolvePacketAssetSrc(packet.homePromotions.specialLab.asset?.filePath) ||
    resolvePacketAssetSrc(packet.assets.specialLabCard?.filePath) ||
    resolvePacketAssetSrc(packet.assets.cover?.filePath)
  );
}

export function getPacketInlineAssetSrc(packet: PortfolioExportPacket, index: number) {
  return resolvePacketAssetSrc(packet.assets.inline[index]?.filePath);
}

export function getPacketActionLinks(packet: PortfolioExportPacket) {
  return [
    packet.links.github ? { label: "GitHub", href: packet.links.github } : null,
    packet.links.demo ? { label: "Demo", href: packet.links.demo } : null,
    packet.links.brunch ? { label: "Brunch", href: packet.links.brunch } : null,
    packet.links.portfolio ? { label: "Portfolio", href: packet.links.portfolio } : null,
  ].filter(Boolean) as Array<{ label: string; href: string }>;
}
