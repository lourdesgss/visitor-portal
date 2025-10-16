import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = {
    nl: { name: 'Dutch', id: 'NL' },
    en: { name: 'English', id: 'EN' },
    de: { name: 'German', id: 'DE' },
    pl: { name: 'Polish', id: 'PL' },
    uk: { name: 'Ukrainian', id: 'UK' },
    ru: { name: 'Russian', id: 'RU' },
    hu: { name: 'Hungarian', id: 'HU' },
    bg: { name: 'Bulgarian', id: 'BG' },
    ro: { name: 'Romanian', id: 'RO' },
    sk: { name: 'Slovak', id: 'SK' },
    cs: { name: 'Czech', id: 'CS' },
    sl: { name: 'Slovenian', id: 'SL' },
    hr: { name: 'Croatian', id: 'HR' },
    bs: { name: 'Bosnian', id: 'BS' },
    es: { name: 'Spanish', id: 'ES' },
};

interface LanguageSelectorProps {
    currentLanguage: keyof typeof languages;
    onLanguageChange: (code: keyof typeof languages) => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-white/90 hover:text-white hover:bg-white/10">
                    <Globe className="w-4 h-4" />
                    <span>{languages[currentLanguage].id}</span>
                    <span className="hidden sm:inline">{languages[currentLanguage].name}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[160px]">
                {Object.entries(languages).map(([code, { name, id }]) => (
                    <DropdownMenuItem
                        key={code}
                        onClick={() => onLanguageChange(code as keyof typeof languages)}
                        className={`gap-2 cursor-pointer ${currentLanguage === code ? 'bg-blue-50' : ''}`}
                    >
                        <span className="text-lg">{id}</span>
                        <span>{name}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}