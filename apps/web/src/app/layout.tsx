import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react";
import { defaultTheme } from "config";
import { Metadata } from "next";
import c from "config";

export const metdata: Metadata = {
	title: `${c.hackathonName} ${c.itteration}`,
	description:c.defaultMetaDataDescription
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const theme = cookies().get("hk_theme")?.value || defaultTheme;
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={theme === "dark" ? "dark" : ""}>
					{children}
					<Analytics />
				</body>
			</html>
		</ClerkProvider>
	);
}

export const runtime = "edge";
