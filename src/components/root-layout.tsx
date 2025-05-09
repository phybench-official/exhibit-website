import { useState, useEffect } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "./i18n-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import useLocalizedPath from "@/hooks/useLocalizedPath";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

function GithubIcon() {
  return (
    <>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>GitHub</title>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
      <span className="sr-only">GitHub</span>
    </>
  );
}

export function RootLayout() {
  const { t } = useTranslation("common");
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const getLocalizedPath = useLocalizedPath();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // 添加useLocation钩子获取当前路由信息

  // 设置当前页面的路径为活动链接，并在路由变化时更新
  useEffect(() => {
    const pathname = location.pathname;
    // 如果路径是根路径，则设置为"/"
    const localizedPath = pathname.replace(/^(\/zh|\/en)/, "");
    setActiveLink(localizedPath === "" ? "/" : localizedPath);
  }, [location]);

  function NavMenu() {
    return (
      <>
        <li>
          <TubelightNavLink to="/">{t("nav.home")}</TubelightNavLink>
        </li>
        <li>
          <TubelightNavLink to="/doc">{t("nav.doc")}</TubelightNavLink>
        </li>
        <li>
          <TubelightNavLink to="/leaderboard">
            {t("nav.leaderboard")}
          </TubelightNavLink>
        </li>
        <li>
          <TubelightNavLink to="/about">{t("nav.about")}</TubelightNavLink>
        </li>
      </>
    );
  }

  const TubelightNavLink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => {
    // 使用getLocalizedPath函数转换路由路径
    const localizedPath = getLocalizedPath(to);
    const isActive = activeLink === to;

    return (
      <NavLink
        to={localizedPath}
        className={({ isActive }) =>
          cn(
            "relative px-4 py-2 rounded-md font-medium transition-colors",
            "hover:text-primary",
            isActive ? "text-primary" : "text-muted-foreground",
            activeLink === "/" ? "text-white hover:text-slate-400" : "",
          )
        }
        onClick={() => {
          setActiveLink(localizedPath);
          setMenuOpen(false);
        }}
      >
        {children}
        {isActive && (
          <span
            className={cn(
              "absolute bottom-0 left-0 h-0.5 w-full rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(var(--primary),0.8)]",
              activeLink === "/" ? "bg-white" : "bg-primary",
            )}
          />
        )}
      </NavLink>
    );
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <I18nProvider>
        <main className="flex-grow">
          <header
            className={cn(
              "absolute top-0 z-40 w-full px-4 md:px-12 transition-a;; duration-300 ease-in-out",
              activeLink === "/"
                ? "bg-black/25 backdrop-blur "
                : "border-b bg-background/25 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-primary/30",
            )}
          >
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <Link
                  to={getLocalizedPath("/")}
                  className="flex items-center gap-2"
                >
                  <span
                    className={cn(
                      "text-2xl font-bold",
                      activeLink === "/" ? "animate-glow text-white" : "",
                    )}
                  >
                    PHYBench
                  </span>
                </Link>
              </div>

              {/* 移动端菜单按钮 */}
              <div className="flex items-center md:hidden">
                <div className="flex items-center gap-2">
                  <LanguageToggle />
                  <ModeToggle />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative z-50"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    {menuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </Button>
                </div>
              </div>

              {/* 移动端展开菜单 */}
              <div
                className={cn(
                  "fixed inset-0 h-[40vh] z-40 bg-background/35 backdrop-blur-2xl dark:bg-background transition-all duration-300 ease-in-out flex flex-col items-center justify-center md:hidden",
                  menuOpen
                    ? "clip-path-circle-full opacity-100 pointer-events-auto"
                    : "clip-path-circle-0 opacity-0 pointer-events-none",
                )}
                style={{
                  clipPath: menuOpen
                    ? "circle(150% at calc(100% - 2.5rem) 2rem)"
                    : "circle(0% at calc(100% - 2.5rem) 2rem)",
                }}
              >
                <nav className="flex flex-col items-center">
                  <ul className="flex flex-col space-y-6 mb-8 text-center">
                    <NavMenu />
                  </ul>
                  <a
                    href="https://github.com/phybench-official"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="dark:fill-white"
                    >
                      <GithubIcon />
                    </Button>
                  </a>
                </nav>
              </div>

              {/* 桌面端导航 */}
              <nav className="hidden md:flex items-center">
                <ul className="flex space-x-6 mr-6">
                  <NavMenu />
                </ul>
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/phybench-official"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="dark:fill-white"
                    >
                      <GithubIcon />
                    </Button>
                  </a>
                  <LanguageToggle />
                  <ModeToggle />
                </div>
              </nav>
            </div>
          </header>
          <Outlet />
        </main>
        <div className="fixed top-0 right-0 translate-x-[600px] translate-y-[-500px] bg-linear-to-br from-pink-300/25 to-sky-400/25 dark:from-cyan-700/25 dark:to-pink-700/30 blur-3xl w-[1200px] h-[1200px] z-[-50] rounded-full"></div>
        <div className="fixed left-0 bottom-0 translate-x-[-800px] translate-y-[900px] bg-linear-to-tr from-cyan-300/25 to-sky-400/5 dark:from-cyan-700/25 dark:to-orange-700/30 blur-3xl w-[1200px] h-[1200px] z-[-50] rounded-full"></div>
      </I18nProvider>
    </ThemeProvider>
  );
}
