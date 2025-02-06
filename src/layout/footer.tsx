import type { PropsWithChildren } from 'react';

import { Icons } from "@/components/ui/icons";
import { siteConfig } from '@/lib/config';

import Link from 'next/link';

interface SocialLinkProps extends PropsWithChildren {
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const SocialLink = ({ href, icon: Icon, children }: SocialLinkProps) => {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group">
      <span className="sr-only">{children}</span>
      <Icon className="h-5 w-5 fill-zinc-700 transition group-hover:fill-gray-100 dark:group-hover:fill-gray-200" />
    </a>
  )
}

export const Footer = () => {
  return (
    <div className="w-full gap-5 border-t border-gray-900/5 dark:border-white/5 lg:h-20">
      <div className="px-4 max-w-screen-xl flex mx-auto flex-col my-8 lg:my-0 items-center justify-between gap-5 sm:flex-row h-full">
        <p className="text-xs text-gray-600 dark:text-gray-100">
          Copyright © {new Date().getFullYear()}{' '}
          <Link
            href="https://twitter.com/justansub"
            className=" text-blue-600 underline hover:text-blue-700"
          >
            {siteConfig.title}.AI
          </Link>
        </p>
        <div className="flex gap-4">
          <SocialLink href={siteConfig.links.x} icon={Icons.XIcon}>
            Follow me on X
          </SocialLink>
          <SocialLink href={siteConfig.links.github} icon={Icons.GitubIcon}>
            Follow me on GitHub
          </SocialLink>
          <SocialLink href={siteConfig.links.discord} icon={Icons.DiscordIcon}>
            Join the Discord
          </SocialLink>
        </div>
      </div>
    </div>
  )
}
