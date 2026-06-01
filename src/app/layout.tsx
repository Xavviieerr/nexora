import type { Metadata } from "next";
import { ReactNode } from "react";
import ToasterProvider from "@/components/ToasterProvider";
import LoadingScreen from "@/components/LoadingScreen";
import "./globals.css";

export const metadata: Metadata = {
	title: "Nexora",
	description: "Visual query builder",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body suppressHydrationWarning>
				<ToasterProvider>
					<LoadingScreen />
					{children}
				</ToasterProvider>
			</body>
		</html>
	);
}
