import React from "react";
import { content } from "@/config/content";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-background text-foreground">
      <section className="w-full max-w-3xl flex flex-col items-start">
        <h1 className="text-5xl font-serif font-normal mb-2 text-left pt-12">Portfolio</h1>
        <hr className="border-t border-gray-300 dark:border-gray-500 w-1/2 mb-8 ml-0" />
        <div className="w-full flex flex-col gap-8">
          {content.projects?.map((project, idx) => (
            <div key={idx} className="bg-card rounded-xl shadow-lg p-8 flex flex-col gap-2 border border-border">
              <h2 className="text-2xl font-bold mb-1">{project.title}</h2>
              <div className="text-sm text-muted-foreground mb-2">{project.timeframe} &mdash; <span className="italic">{project.role}</span></div>
              <p className="mb-3 text-foreground/80 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech, tIdx) => (
                  <span key={tIdx} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-mono border border-border">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 