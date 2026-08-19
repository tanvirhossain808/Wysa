import { useAuthCallback } from "@/hooks/useAuth";
import { useEffect, useRef } from "react";
// import { useAuth, useUser }
import * as Sentry from "@sentry/react-native";
import { useUser, useAuth } from "@clerk/expo";

const AuthSync = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { mutate: syncUser } = useAuthCallback();
  const hasSynced = useRef(false); // this is used to not run useEffect more than once

  useEffect(() => {
    if (isSignedIn && user && !hasSynced.current) {
      hasSynced.current = true;

      syncUser(undefined, {
        onSuccess: (data) => {
          console.log("✅ User synced with backend:", data.name);
          //   Sentry.logger.info(
          //     Sentry.logger.fmt`User synced with backend: ${data.name}`,
          //     {
          //       userId: user.id,
          //       userName: data.name,
          //     },
          //   );
        },
        onError: (error) => {
          console.log("❌ User sync failed for the user:", error);
          Sentry.logger.error("Failed to sync user with backend", {
            userId: user.id,
            error: error instanceof Error ? error.message : String(error),
          });
        },
      });
    }

    if (!isSignedIn) {
      hasSynced.current = false;
    }
  }, [isSignedIn, user, syncUser]);

  return null;
};

export default AuthSync;
