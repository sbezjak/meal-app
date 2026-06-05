# How to edit The Kitchen 🍳

A plain-English guide for changing your recipes and weekly plan. You only ever touch two files, both in `src/data/`.

---

## The two files

| File | What it controls |
|------|------------------|
| `src/data/recipes.json` | **What a recipe is** — title, ingredients, steps, tips. |
| `src/data/weeks.json` | **When you eat it** — which recipe goes on which day, and the prep plan. |

(There's also `src/data/categories.json` for the coloured category labels — you'll rarely need it.)

---

## Edit a recipe

Open `recipes.json`, find the recipe, change the text. Done.

## Add a new recipe

Copy an existing `{ ... }` block, paste it, and change the fields. A simple one looks like this:

```json
{
  "id": "my_new_meal",
  "title": "My New Meal",
  "category": "chicken",
  "portions": "2 portions",
  "ingredients": [
    { "item": "Chicken breast", "qty": "400 g", "aisle": "Meat & tofu" },
    { "item": "Rice", "qty": "for 2", "aisle": "Grains & carbs" }
  ],
  "steps": [
    "Cook the chicken.",
    "Serve over rice."
  ]
}
```

Rules:
- **`id`** must be unique — lowercase, no spaces (use `_`).
- **`category`** must be one of: `chicken`, `veg`, `vegan`, `breakfast`, `snack`, `basic`, `takeout`.
- **`aisle`** decides where the item shows up in the shopping list. Use one of:
  `Produce`, `Meat & tofu`, `Dairy & eggs`, `Frozen`, `Grains & carbs`, `Bakery`, `Cans & jars`, `Sauces & oils`, `Spices & dried herbs`, `Pantry`.

Optional extras:
- **`tip`** — adds a 💡 note at the bottom of the recipe:
  `"tip": "Vary the carb so it's not the same two days.",`
- **A sauce/sub-recipe reference** — if your meal uses one of your Basics & Sauces, add it as an ingredient starting with `→`:
  `{ "item": "→ Yoghurt sauce", "qty": "1 batch", "aisle": "ref" }`
  The app prints the full sauce recipe inside the meal automatically. Names it recognises: *mushroom sauce, cream sauce, marinara, peanut, breaded, burger sauce, yoghurt, cheese bread*.

---

## Put a recipe into the weekly plan

Open `weeks.json`. Each week has a list of `days`. Add or change a day using the recipe's **`id`**:

```json
{ "d": "Wed", "id": "my_new_meal", "tag": "cook" }
```

- **`d`** = the day label (`Mon`…`Sun`).
- **`id`** = matches the recipe's `id` in `recipes.json`.
- **`tag`** = how you get it that day:
  - `cook` → 🟢 cook fresh
  - `fridge` → leftovers from earlier in the week
  - `freezer` → reheat from the freezer
  - `takeout` → your free day (eat out / leftovers — must stay on Sat or Sun)

The same week also has the **prep plan** text:
- `prepDay` — the list for your one big prep session.
- `duringWeek` — the quick cooks you do on specific days, e.g. `{ "d": "Mon", "t": "Cook the bro meal: covers Mon + Tue." }`.

Breakfast is a list of two recipe ids you rotate:
`"breakfast": ["oats_base", "banana_egg_muffins"],`

---

## Golden rules (avoid breakage)

1. **Commas:** every item in a list needs a comma after it — *except the last one*. Most errors are a missing or extra comma.
2. **Quotes:** keep the `"double quotes"` around all text.
3. **Matching ids:** a day's `id` in `weeks.json` must exactly match a recipe `id` in `recipes.json`.

---

## See your changes

- While editing, run **`npm run dev`** and the app updates the moment you save.
- To publish the real site, run **`npm run build`**.
- **Quick safety check:** run `npm run build` — if you made a typo or missed a comma, it stops and tells you roughly where, so nothing breaks silently.

If anything looks wrong and you can't spot why, just ask me. 🙂
