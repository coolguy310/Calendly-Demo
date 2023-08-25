import { useAuth } from "@/common/hooks/useAuth";
import { auth } from "@/firebase";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface TemplateProps {
  children: JSX.Element;
  displayHeader?: boolean;
}

const Template = ({ children, displayHeader = true }: TemplateProps) => {
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {displayHeader && (
        <div className="header w-full py-2 px-16 mt-4 flex justify-between">
          <Link to="/home">
            <img src="/logo.png" className="w-18 h-8" />
          </Link>
          {isLoggedIn && (
            <Button
              onClick={async () => {
                await auth.signOut();
                navigate("/");
              }}
              className="text-yellow-500 bg-transparent hover:bg-transparent hover:border-transparent"
            >
              Log out
            </Button>
          )}
        </div>
      )}
      <div className={`${displayHeader ? "mt-2" : "mt-8"}`}>{children}</div>
    </div>
  );
};

export default Template;
