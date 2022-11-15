import { ReactComponent as MailIcon } from "../../assets/icons/mail.svg";
import { Marquee } from "components/ui/marquee";

export const Footer = () => {
    return (
        <div className='width-screen relative flex-1 flex flex-col overflow-hidden'>
            <Marquee />
            <footer className='flex bg-slate-700 text-slate-300 py-12 px-16 flex-col items-center'>
                <div className='text-xl tracking-wide'>About This Tour</div>

                <div className='mt-4 text-center underline flex items-center'>
                    <MailIcon
                        style={{
                            width: "16px",
                            height: "16px",
                            marginRight: "6px",
                        }}
                    />
                    info@gofourthpittsburgh.org
                </div>
            </footer>
        </div>
    );
};
