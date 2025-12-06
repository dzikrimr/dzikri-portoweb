export const Footer = () => {
  return (
    <footer className="py-6 px-6 border-t border-border">
      <div 
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
        data-aos="fade-up"
        data-aos-offset="0"
      >
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};
