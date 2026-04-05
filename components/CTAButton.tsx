import { cn } from "@/lib/utils"

const CTAButton = ({text}: {text: string}) => {
  return (
     <button className={cn(`bg-[#FF6242] px-[20px] py-[10px] rounded-[5px] cursor-pointer text-sm font-medium`)}>
          {text}
     </button>
  )
}

export default CTAButton
