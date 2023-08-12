// withAuthRedirect.tsx
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { counterStates, setSignUpModal } from "@/redux/counterReducer";

const withAuthRedirect = (WrappedComponent) => {
  const RequiresAuth = (props) => {
    const router = useRouter();
    const { userData } = useSelector(counterStates);
    const dispatch = useDispatch();

    if (!userData) {
      router.replace("/"); // Redirect to login if no user data found
      dispatch(setSignUpModal(true));

      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return RequiresAuth;
};

export default withAuthRedirect;
