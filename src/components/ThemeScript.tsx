export function ThemeScript() {
  const code = `(function(){try{if(localStorage.getItem('dark')==='1'){document.documentElement.classList.add('dark');}}catch(e){}})();`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: code }}
      suppressHydrationWarning
    />
  );
}
