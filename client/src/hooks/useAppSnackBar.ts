import { useSnackbar } from "notistack";
const useAppSnackBar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const showSnackBar = (msg: string, type: "error" | "success") => {
    enqueueSnackbar(msg, {
      autoHideDuration: 3000,
      variant: type,
      anchorOrigin: {
        horizontal: "right",
        vertical: "bottom",
      },
    });
  };
  return showSnackBar
};

export default useAppSnackBar;