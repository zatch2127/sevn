<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Use shared café layout and data modules for all SEVN content routes so navigation, menu items and brand presentation stay consistent.
- Keep the reference recreation presentation-only; do not imply live booking, checkout or newsletter delivery without connected services.
- Keep the useState cart provider above all café pages so its contents survive client navigation without persistence or live checkout.
- Use the shared reference-derived product catalogue for shop names, descriptions, prices, and images to prevent inconsistent café content.
- Resolve menu thumbnails through the shared product catalogue so photo changes propagate to both menu and shop.
- Checkout opens an in-memory order review only, with explicit payment and order unavailability to avoid implying a live transaction.
