"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  Loader2,
  UserPlus,
  AlertCircle,
  ChevronDown,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  userinfo?: {
    skill?: string;
  };
}

interface CollaborateDialogProps {
  project: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectUpdated: () => void;
}

export default function CollaborateDialog({
  project,
  isOpen,
  onOpenChange,
  onProjectUpdated,
}: CollaborateDialogProps) {
  const [inviteError, setInviteError] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  const [showRoleOptions, setShowRoleOptions] = useState(false);
  const [emailSuggestions, setEmailSuggestions] = useState<User[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("MEMBER");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inviteEmail);
    }, 300);

    return () => clearTimeout(timer);
  }, [inviteEmail]);

  // Fetch suggestions based on debounced query
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setEmailSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoadingSuggestions(true);
      try {
        // Fetch all collaborators regardless of the debouncedQuery
        const response = await fetch(`/api/collaborators`);
        // Parse response and print what we fetched from the database
        const data = await response.json();
        console.log("Fetched response status:", response.status, response.statusText);
        console.log("Fetched data:", data);

        if (Array.isArray(data.collaborators)) {
          console.log("Fetched collaborators count:", data.collaborators.length);
          console.table(data.collaborators);
        } else {
          console.warn("No collaborators array in response:", data);
        }
        if (!response.ok) {
          console.error("Failed to search users:", data);
          setEmailSuggestions([]);
          return;
        }

        const allCollaborators: any[] = Array.isArray(data.collaborators)
          ? data.collaborators
          : [];

        const shuffled = [...allCollaborators].sort(() => Math.random() - 0.5);
        const picked = shuffled.slice(0, 5).map((c: any) => ({
          id: c.id ?? c._id ?? c.email,
          name: c.name ?? null,
          email: c.email ?? "",
          image: c.image ?? null,
          userinfo: c.userinfo ?? undefined,
        }));

        setEmailSuggestions(picked);
        return;
        setEmailSuggestions([]);
        if (response.ok) {
          const data = await response.json();
          const suggestions = data.collaborators || [];
          setEmailSuggestions(suggestions);
        } else {
          console.error("Failed to search users");
          setEmailSuggestions([]);
        }
      } catch (error) {
        console.error("Error searching users:", error);
        setEmailSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  // Update showSuggestions based on suggestions and current input
  useEffect(() => {
    setShowSuggestions(emailSuggestions.length > 0 && inviteEmail.length >= 2);
  }, [emailSuggestions, inviteEmail]);

  const handleSuggestionSelect = (user: User) => {
    setInviteEmail(user.email);
    setShowSuggestions(false);
    setEmailSuggestions([]);
    setSelectedSuggestionIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || emailSuggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < emailSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionSelect(emailSuggestions[selectedSuggestionIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInviting(true);
    setInviteError("");

    if (!inviteEmail) {
      setInviteError("Email address is required");
      setIsInviting(false);
      return;
    }

    if (!inviteRole) {
      setInviteError("Role is required");
      setIsInviting(false);
      return;
    }

    try {
      const response = await fetch(`/api/projects/${project.id}/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inviteEmail,
          role: inviteRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setInviteError(data.message || "Failed to send invitation");
        setIsInviting(false);
        return;
      }

      toast.success("Invitation sent successfully");
      onOpenChange(false);
      resetForm();
      onProjectUpdated();
    } catch (error) {
      console.error("Error sending invitation:", error);
      setInviteError("An unexpected error occurred");
    } finally {
      setIsInviting(false);
    }
  };

  const resetForm = () => {
    setInviteEmail("");
    setInviteRole("MEMBER");
    setEmailSuggestions([]);
    setShowSuggestions(false);
    setInviteError("");
    setSelectedSuggestionIndex(-1);
    setDebouncedQuery("");
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Admin";
      case "EDITOR":
        return "Editor";
      case "MEMBER":
        return "Member";
      default:
        return "Select a role";
    }
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setShowRoleOptions(false);
      setShowSuggestions(false);
      setEmailSuggestions([]);
      setSelectedSuggestionIndex(-1);
      resetForm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-xs sm:max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Invite Team Members</DialogTitle>
          <DialogDescription>
            Invite team members to collaborate on this project
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleInvite} className="space-y-4 py-4">
          {inviteError && (
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-red-600 dark:text-red-400 text-sm flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{inviteError}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground z-10" />
              <Input
                ref={inputRef}
                id="email"
                placeholder="Enter email address"
                className="pl-9 pr-9"
                value={inviteEmail}
                onChange={(e) => {
                  setInviteEmail(e.target.value);
                  setSelectedSuggestionIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                required
              />
              {inviteEmail && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0 z-10"
                  onClick={() => {
                    setInviteEmail("");
                    setEmailSuggestions([]);
                    setShowSuggestions(false);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}

              {/* Email Suggestions Dropdown */}
              {showSuggestions && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-20 mt-1 w-full rounded-md border border-input bg-popover shadow-md max-h-[200px] overflow-y-auto"
                >
                  {isLoadingSuggestions ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    </div>
                  ) : emailSuggestions.length === 0 ? (
                    <div className="py-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        No users found
                      </p>
                    </div>
                  ) : (
                    <div className="py-1">
                      {emailSuggestions.map((user, index) => (
                        <button
                          key={user.id}
                          type="button"
                          className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent cursor-pointer ${
                            selectedSuggestionIndex === index ? "bg-accent" : ""
                          }`}
                          onClick={() => handleSuggestionSelect(user)}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={user.image || ""}
                              alt={user.name || "User"}
                            />
                            <AvatarFallback className="text-xs">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {user.name || "Unnamed User"}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {user.email}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Enter the email address of the user you want to invite
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowRoleOptions(!showRoleOptions)}
                className="w-full flex items-center justify-between px-3 py-2 border border-input rounded-md bg-background text-sm"
                id="role"
              >
                <span>{getRoleDisplay(inviteRole)}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>

              {showRoleOptions && (
                <div className="absolute z-10 mt-1 w-full rounded-md border border-input bg-popover shadow-md">
                  <div className="py-1">
                    <button
                      type="button"
                      className="relative w-full flex items-center px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      onClick={() => {
                        setInviteRole("ADMIN");
                        setShowRoleOptions(false);
                      }}
                    >
                      <span className="mr-2 flex h-3.5 w-3.5 items-center justify-center">
                        {inviteRole === "ADMIN" && (
                          <Check className="h-4 w-4" />
                        )}
                      </span>
                      Admin
                    </button>
                    <button
                      type="button"
                      className="relative w-full flex items-center px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      onClick={() => {
                        setInviteRole("EDITOR");
                        setShowRoleOptions(false);
                      }}
                    >
                      <span className="mr-2 flex h-3.5 w-3.5 items-center justify-center">
                        {inviteRole === "EDITOR" && (
                          <Check className="h-4 w-4" />
                        )}
                      </span>
                      Editor
                    </button>
                    <button
                      type="button"
                      className="relative w-full flex items-center px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                      onClick={() => {
                        setInviteRole("MEMBER");
                        setShowRoleOptions(false);
                      }}
                    >
                      <span className="mr-2 flex h-3.5 w-3.5 items-center justify-center">
                        {inviteRole === "MEMBER" && (
                          <Check className="h-4 w-4" />
                        )}
                      </span>
                      Member
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>
                <span className="font-medium">Admin:</span> Full control over
                the project
              </p>
              <p>
                <span className="font-medium">Editor:</span> Create and manage
                tasks
              </p>
              <p>
                <span className="font-medium">Member:</span> View project and
                participate in tasks assigned to them.
              </p>
            </div>
          </div>

          <DialogFooter className="mt-6 flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isInviting}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-800 text-white"
            >
              {isInviting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Send Invitation
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}