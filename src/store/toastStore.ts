import { toast } from 'sonner'
import{ create} from 'zustand'

type ToastState = {
setToast: (type: "success" | "error" | "warning" | "info", message: string) => void
}

export const useToastStore = create<ToastState>((setToast) => ({
    message: "",
  type: "success",
    setToast: (type, message) => {
        if(type === "success"){
            toast.success(message)
        }
        else if(type === "error"){
            toast.error(message)
        }
        // else if(type === "warning"){
        //     toast.warning(message)
        // }
        // else if(type === "info"){
        //     toast.info(message)
        // }
    },  
}))