export function Footer() {
  return (
    <footer className="w-full border-t border-dark-border py-6 text-center text-sm text-muted-foreground">
      <div className="container px-4 md:px-6">
        <p>&copy; {new Date().getFullYear()} SafetyHelp. All rights reserved.</p>
      </div>
    </footer>
  )
}
