import { ReactComponent as MailIcon } from "../../assets/icons/mail.svg";
import { Marquee } from "components/ui/marquee";
import Link from "next/link";

export const Footer = () => {
    return (
        <div className='width-screen relative flex-1 flex flex-col overflow-hidden md:max-w-[600px] md:mx-auto md:mt-16'>
            {/* <Marquee className='md:hidden' /> */}

            <footer className='flex bg-slate-700 text-slate-300 py-12 px-16 flex-col items-center md:bg-white md:border-slate-400 md:border-2'>
                <div className='flex md:text-slate-600'>
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
                    className='mt-4 text-center underline flex items-center md:text-slate-600'
                    href='mailto:info@gofourthpittsburgh.org'
                >
                    <MailIcon
                        className='mail'
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
