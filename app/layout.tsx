import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plus_Jakarta_Sans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ibanez Kanban App',
  description: 'A Kanban Board web app for all your goals and needs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plus_Jakarta_Sans.className}>
      <body>{children}</body>
    </html>
  );
}
