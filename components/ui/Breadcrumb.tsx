"use client";

import NavLink from "@/components/ui/NavLink";

interface BreadcrumbProps {
  title: string;
  homeLabel: string;
  homeHref: string;
  current: string;
}

export default function Breadcrumb({ title, homeLabel, homeHref, current }: BreadcrumbProps) {
  return (
    <div className="breadcumb-wrapper overflow-hidden" data-bg-src="/assets/img/bg/breadcumb-bg.jpg">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="breadcumb-content">
              <h1 className="breadcumb-title">{title}</h1>
              <ul className="breadcumb-menu">
                <li><NavLink href={homeHref}>{homeLabel}</NavLink></li>
                <li>{current}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
