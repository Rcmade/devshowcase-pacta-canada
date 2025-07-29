"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Common Auth.js error types and their user-friendly messages
const AUTH_ERRORS = {
  Configuration: "Authentication configuration error",
  AccessDenied: "Access denied - insufficient permissions",
  Verification: "Email verification failed",
  Default: "Authentication error occurred",
  OAuthSignin: "Error signing in with OAuth provider",
  OAuthCallback: "OAuth callback error",
  OAuthCreateAccount: "Could not create OAuth account",
  EmailCreateAccount: "Could not create email account",
  Callback: "Authentication callback error",
  OAuthAccountNotLinked: "OAuth account not linked",
  EmailSignin: "Error sending email",
  CredentialsSignin: "Invalid credentials provided",
  SessionRequired: "Session required but not found",
};

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get error from URL params if not provided as props
  const errorType = searchParams?.get("error") || "Default";
  const errorMessage = searchParams?.get("message") || "";

  const userFriendlyError =
    AUTH_ERRORS[errorType as keyof typeof AUTH_ERRORS] || AUTH_ERRORS.Default;

  useEffect(() => {
    // Log error for debugging
    console.error("Auth.js Error:", { errorType, errorMessage });
  }, [errorType, errorMessage]);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  const [isSignInLoading, setIsSignInLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Authentication Error
          </CardTitle>
          <CardDescription>
            We encountered an issue while processing your authentication request
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Error Details */}
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error Details</AlertTitle>
            <AlertDescription className="mt-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {errorType}
                  </Badge>
                </div>
                <p className="text-sm">{userFriendlyError}</p>
                {errorMessage && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {errorMessage}
                  </p>
                )}
              </div>
            </AlertDescription>
          </Alert>

          {/* Serverless Hosting Information */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Common Cause</AlertTitle>
            <AlertDescription>
              <p className="text-sm">
                This error commonly occurs due to serverless hosting environment
                limitations with authentication providers. Serverless functions
                may experience cold starts or timeout issues that can interrupt
                the authentication flow.
              </p>
              <p className="text-sm mt-2 font-medium">
                Please try again - the issue often resolves on retry.
              </p>
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={async () => {
                setIsSignInLoading(true);
                await signIn("rauth", {
                  redirectTo: "/profile",
                });
                // push("/profile");
              }}
              disabled={isSignInLoading}
              spinner
              className="w-full"
              size="lg"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Sign In
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleGoBack}
                className="flex-1 bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>

              <Button
                variant="outline"
                onClick={handleGoHome}
                className="flex-1 bg-transparent"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </div>
          </div>

          {/* Additional Help */}
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              If the problem persists, please contact support or try a different
              authentication method.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
