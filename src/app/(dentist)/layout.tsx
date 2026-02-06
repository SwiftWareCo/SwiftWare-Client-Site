import { DentistHeader } from "@/components/dentist/DentistHeader";
import { DentistFooter } from "@/components/dentist/DentistFooter";

export default function DentistLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="text-slate-900 font-[family-name:var(--font-outfit)]">
            <DentistHeader />
            <main id="main" tabIndex={-1} className="relative">
                {children}
            </main>
            <DentistFooter />
        </div>
    );
}
