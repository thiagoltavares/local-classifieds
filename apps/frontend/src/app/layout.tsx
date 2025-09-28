import type { Metadata } from 'next';
import './globals.css';
import {
  ThemeProvider,
  I18nProvider,
  QueryProvider,
  ToastProvider,
} from './providers';

export const metadata: Metadata = {
  title: 'Local Classifieds',
  description: 'A local classifieds SaaS platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <I18nProvider>
            <QueryProvider>
              <ToastProvider>{children}</ToastProvider>
            </QueryProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
