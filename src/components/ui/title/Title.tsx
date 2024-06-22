import { titleFont } from "@/config/fonts";

interface Props {
    title: string;
    subtitle?: string;
    className?: string;
}
export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`${className} mt-3`}>
        <h1 className={`${titleFont.className} antialiased md:text-4xl text-2xl font-semibold my-4`}>
            {title}
        </h1>

        {
            subtitle && (
                <h3 className="text-xl mb-5">{ subtitle }</h3>
            ) 
        }
    </div>
  )
}
