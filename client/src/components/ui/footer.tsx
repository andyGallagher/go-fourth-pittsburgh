import { ReactComponent as MailIcon } from "../../assets/icons/mail.svg";
import { Marquee } from "components/ui/marquee";
import Link from "next/link";

export const Footer = () => {
    return (
        <div className='width-screen relative flex-1 flex flex-col overflow-hidden'>
            <Marquee />
            <footer className='flex bg-slate-700 text-slate-300 py-12 px-16 flex-col items-center'>
                <div className='flex'>
                    <Link
                        className='text-xl tracking-wide underline'
                        href='/about'
                    >
                        About
                    </Link>

                    <Link
                        className='text-xl tracking-wide underline ml-4'
                        href='/'
                    >
                        Home
                    </Link>
                </div>

                <a
                    className='mt-4 text-center underline flex items-center'
                    href='mailto:info@gofourthpittsburgh.org'
                >
                    <MailIcon
                        style={{
                            width: "16px",
                            height: "16px",
                            marginRight: "6px",
                        }}
                    />
                    info@gofourthpittsburgh.org
                </a>
            </footer>
        </div>
    );
};
