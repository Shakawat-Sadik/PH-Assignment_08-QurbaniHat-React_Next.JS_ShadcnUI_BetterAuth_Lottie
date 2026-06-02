"use client";
import { X } from "lucide-react"
import * as React from "react"
import { flushSync } from "react-dom"
import { cn } from "@/lib/utils"

const MorphingDialogContext =
  React.createContext(null)

function useMorphingDialog() {
  const context = React.useContext(MorphingDialogContext)
  if (!context) {
    throw new Error("MorphingDialog components must be used within MorphingDialog")
  }
  return context
}

// ============================================================================
// Utilities
// ============================================================================

const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Fallback for browsers without View Transitions
const transition = (callback) => {
  if (
    typeof document === "undefined" ||
    !document.startViewTransition ||
    prefersReducedMotion()
  ) {
    callback()
    return { finished: Promise.resolve() };
  }
  return document.startViewTransition(callback);
}

// Helper to set/clear view transition names
const setTransitionNames = (
  element,
  name,
  active,
) => {
  if (!element || prefersReducedMotion()) return
  element.style.viewTransitionName = active ? name : ""
}

export function MorphingDialog({
  children
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const uniqueId = React.useId().replace(/:/g, "-")
  const dialogRef = React.useRef(null)
  const sourceRef = React.useRef(null)

  const openDialog = React.useCallback((triggerEl) => {
    sourceRef.current = triggerEl
    const dialog = dialogRef.current
    if (!dialog) return

    // Set view transition name on source before transition
    setTransitionNames(triggerEl, `morph-${uniqueId}`, true)

    transition(() => {
      // Mark source as expanded (hidden) and remove name
      triggerEl.setAttribute("data-expanded", "true")
      setTransitionNames(triggerEl, `morph-${uniqueId}`, false)
      // Render content first
      flushSync(() => {
        setIsOpen(true)
      })
      // Open dialog (makes it visible)
      dialog.showModal()
      // Now set name on visible dialog
      setTransitionNames(dialog, `morph-${uniqueId}`, true)
    }).finished.then(() => {
      // Keep name on dialog for closing transition
    })
  }, [uniqueId])

  const closeDialog = React.useCallback(() => {
    const dialog = dialogRef.current
    const source = sourceRef.current
    if (!dialog || !source) return

    // Dialog already has view-transition-name from opening
    transition(() => {
      // Hand-off: remove from dialog, add to source
      setTransitionNames(dialog, `morph-${uniqueId}`, false)
      setTransitionNames(source, `morph-${uniqueId}`, true)
      // Remove expanded state
      source.removeAttribute("data-expanded")
      // Close dialog
      flushSync(() => {
        setIsOpen(false)
      })
      dialog.close()
    }).finished.then(() => {
      // Clean up after transition
      if (source) {
        setTransitionNames(source, `morph-${uniqueId}`, false)
      }
    })
  }, [uniqueId])

  return (
    <MorphingDialogContext.Provider
      value={{
        isOpen,
        uniqueId,
        openDialog,
        closeDialog,
        dialogRef,
        sourceRef,
      }}>
      {children}
    </MorphingDialogContext.Provider>
  );
}

export function MorphingDialogTrigger({
  children,
  className,
  style
}) {
  const { openDialog } = useMorphingDialog()
  const triggerRef = React.useRef(null)

  const handleClick = React.useCallback(() => {
    if (triggerRef.current) {
      openDialog(triggerRef.current)
    }
  }, [openDialog])

  return (
    <div
      ref={triggerRef}
      onClick={handleClick}
      className={cn("cursor-pointer [&[data-expanded=true]]:invisible", className)}
      style={style}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          handleClick()
        }
      }}>
      {children}
    </div>
  );
}

export function MorphingDialogContainer({
  children
}) {
  const { isOpen, closeDialog, dialogRef } = useMorphingDialog()

  // Handle cancel event (Escape key, click outside with closedby="any")
  const handleCancel = React.useCallback((e) => {
    e.preventDefault()
    closeDialog()
  }, [closeDialog])

  // Handle backdrop click
  const handleBackdropClick = React.useCallback((e) => {
    // Only close if clicking directly on the dialog (backdrop)
    if (e.target === e.currentTarget) {
      closeDialog()
    }
  }, [closeDialog])

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      className={cn(
        "m-auto border-none bg-transparent p-0",
        "w-full max-w-lg max-h-[calc(100vh-2rem)]",
        "backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      )}>
      {isOpen && children}
    </dialog>
  );
}

export function MorphingDialogContent({
  children,
  className,
  style
}) {
  const contentRef = React.useRef(null)

  // Focus content when mounted
  React.useEffect(() => {
    contentRef.current?.focus()
  }, [])

  return (
    <div
      ref={contentRef}
      className={cn(
        "relative w-full rounded-xl bg-background p-6 shadow-2xl outline-none",
        className
      )}
      style={style}
      tabIndex={-1}>
      {children}
    </div>
  );
}

export function MorphingDialogImage({
  src,
  alt,
  className,
  style
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("object-cover", className)}
      style={style} />
  );
}

export function MorphingDialogTitle({
  children,
  className
}) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}

export function MorphingDialogSubtitle({
  children,
  className
}) {
  return (<p className={cn("text-sm text-muted-foreground", className)}>{children}</p>);
}

export function MorphingDialogDescription({
  children,
  className
}) {
  return (
    <div className={cn("mt-4 text-sm text-muted-foreground", className)}>
      {children}
    </div>
  );
}

export function MorphingDialogClose({
  children,
  className
}) {
  const { closeDialog } = useMorphingDialog()

  return (
    <button
      onClick={closeDialog}
      className={cn(
        "absolute right-2 top-2 rounded-full p-1 transition-colors cursor-pointer",
        "bg-background/80 text-foreground backdrop-blur-sm",
        "hover:bg-background",
        // Invisible touch target extension for mobile (44x44px minimum)
        "after:absolute after:inset-0 after:-m-2 after:content-['']",
        className
      )}
      aria-label="Close dialog">
      {children || <X className="h-3.5 w-3.5" />}
    </button>
  );
}
