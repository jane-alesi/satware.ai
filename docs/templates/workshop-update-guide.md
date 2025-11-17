# Workshop Update Guide

**Last Updated:** 2025-11-17  
**Version:** 1.0

This guide explains how to easily add, update, and manage workshop entries on the satware.ai website using the new template-based system.

---

## 📚 Quick Reference

**Files involved:**
- `docs/workshops/index.md` - Workshop page (uses Jinja2 macros)
- `docs/workshops/_data/workshops.yml` - Workshop data (YAML format)

**No HTML knowledge required!** Just copy, paste, and edit the template.

---

## ✨ Adding a New Workshop

### Step 1: Get Workshop Details from VHS

Visit the VHS course page (e.g., `https://www.vhs-worms.de/programm/kurs/...`) and note:
- Date and day of week
- Time (start – end)
- Course title
- Course ID (e.g., Z04.052)
- Location
- VHS link (full URL)

### Step 2: Add to workshops/index.md

Open `docs/workshops/index.md` and find the "UPCOMING WORKSHOPS" section (around line 40).

**Copy this template:**
```jinja2
{{ workshop_item(
  day="Sa.",
  date="DD.MM.YYYY",
  time="HH:MM – HH:MM Uhr",
  title="Workshop Title Here",
  course_id="Z04.XXX",
  course_type="DigiSmart-Kurs",
  location="vhs, Willy-Brandt-Ring 11, Raum 1.09, 67547 Worms",
  vhs_link="https://www.vhs-worms.de/programm/kurs/..."
) }}
```

**Paste it above the closing `</div>` tag** and fill in your workshop details.

### Step 3: Update YAML Data (Optional)

For backup/tracking purposes, also add the workshop to `docs/workshops/_data/workshops.yml`:

```yaml
  - date: "YYYY-MM-DD"
    day: "Sa."
    time: "HH:MM – HH:MM Uhr"
    title: "Workshop Title"
    course_id: "Z04.XXX"
    course_type: "DigiSmart-Kurs"
    vhs_link: "https://www.vhs-worms.de/..."
    location: "vhs, Willy-Brandt-Ring 11, Raum 1.09, 67547 Worms"
    instructor: "Michael Wegener"
```

### Step 4: Test and Commit

```bash
# Test locally
./mkdocs.sh

# View at http://localhost:8000/workshops

# Commit changes
git add docs/workshops/
git commit -m "feat(workshops): Add new workshop Z04.XXX for DD.MM.YYYY"
git push
```

---

## 🗂️ Moving Workshop to Past/Archive

When a workshop date has passed:

### Step 1: Cut from Upcoming Section

In `docs/workshops/index.md`, cut the entire `workshop_item()` block from the "UPCOMING WORKSHOPS" section.

### Step 2: Paste to Past Section

Paste it in the "PAST WORKSHOPS" section (around line 70).

### Step 3: Remove VHS Link

**Important:** Remove the `vhs_link` parameter because past courses are no longer accessible on VHS website.

**Before (upcoming):**
```jinja2
{{ workshop_item(
  day="Sa.",
  date="29.11.2025",
  time="09:00 – 13:00 Uhr",
  title="KI-Chatbots im Privatleben nutzen",
  course_id="Z04.052",
  course_type="DigiSmart-Kurs",
  location="vhs, Willy-Brandt-Ring 11, Raum 1.09, 67547 Worms",
  vhs_link="https://www.vhs-worms.de/..."  ← REMOVE THIS LINE
) }}
```

**After (past):**
```jinja2
{{ workshop_item(
  day="Sa.",
  date="29.11.2025",
  time="09:00 – 13:00 Uhr",
  title="KI-Chatbots im Privatleben nutzen",
  course_id="Z04.052",
  course_type="DigiSmart-Kurs",
  location="vhs, Willy-Brandt-Ring 11, Raum 1.09, 67547 Worms"
) }}
```

### Step 4: Update YAML (Optional)

Move the entry from `upcoming:` to `past:` section and remove `vhs_link:` line.

---

## 📝 Complete Example

### Scenario: Adding Workshop for January 15, 2026

**VHS Page:** `https://www.vhs-worms.de/programm/kurs/KI-Einsatz-im-Beruf/Z04.100`

**Template filled:**
```jinja2
{{ workshop_item(
  day="Mi.",
  date="15.01.2026",
  time="18:00 – 21:00 Uhr",
  title="KI-Einsatz im Beruf – Nutzen von KI-Chatbots im Arbeitsalltag",
  course_id="Z04.100",
  course_type="DigiSmart-Kurs",
  location="vhs, Willy-Brandt-Ring 11, Raum 1.09, 67547 Worms",
  vhs_link="https://www.vhs-worms.de/programm/kurs/KI-Einsatz-im-Beruf/Z04.100"
) }}
```

---

## 🎨 Visual Features

### Icons Used

The template automatically uses different icons:

- **Upcoming workshops:** 🔗 External link icon (`fa-arrow-up-right-from-square`)
- **Past workshops:** 🎓 Graduation cap icon (`fa-graduation-cap`)
- **Date:** 📅 Calendar icon (`fa-calendar-day`)
- **Time:** ⏰ Clock icon (`fa-clock`)
- **Location:** 📍 Location pin icon (`fa-location-dot`)

### CSS Classes

The system uses existing CSS classes:
- `.satag--webinar-dates` - Container for workshop list
- `.satag--webinar-item` - Individual workshop entry
- `.satag--webinar-date` - Date display
- `.satag--webinar-time` - Time display
- `.satag--webinar-course` - Course title/link
- `.satag--webinar-location` - Location display

No CSS changes needed! The template maintains the current design.

---

## 🔧 Template Parameters Reference

| Parameter | Required | Description | Example |
|-----------|----------|-------------|---------|
| `day` | ✅ Yes | Day of week abbreviation | `"Sa."`, `"Mi."`, `"Fr."` |
| `date` | ✅ Yes | Date in German format | `"29.11.2025"` |
| `time` | ✅ Yes | Time range with dash | `"09:00 – 13:00 Uhr"` |
| `title` | ✅ Yes | Workshop title | `"KI-Chatbots im Privatleben nutzen"` |
| `course_id` | ✅ Yes | VHS course number | `"Z04.052"` |
| `course_type` | ✅ Yes | Course category | `"DigiSmart-Kurs"`, `"Basis-Kurs"` |
| `location` | ✅ Yes | Full location address | `"vhs, Willy-Brandt-Ring 11, Raum 1.09, 67547 Worms"` |
| `vhs_link` | ⚠️ Upcoming only | VHS course URL | `"https://www.vhs-worms.de/..."` |

**Note:** `vhs_link` should ONLY be included for upcoming workshops. Past workshops must omit this parameter.

---

## ❓ Troubleshooting

### Problem: Workshop not showing on website

**Solution:** 
1. Check Jinja2 syntax - ensure all quotes match and commas are present
2. Verify the `{{ workshop_item(` block is complete
3. Make sure it's inside the `<div class="satag--webinar-dates">` container
4. Test with `./mkdocs.sh` locally

### Problem: VHS link broken for past workshop

**Solution:**
This is expected! VHS removes old course pages. Simply remove the `vhs_link` parameter from past workshops.

### Problem: Date format looks wrong

**Solution:**
Use German date format: `"DD.MM.YYYY"` (e.g., `"29.11.2025"`)
Day abbreviations: `"Mo."`, `"Di."`, `"Mi."`, `"Do."`, `"Fr."`, `"Sa."`, `"So."`

### Problem: Template changes not appearing

**Solution:**
1. Stop mkdocs server (`Ctrl+C`)
2. Restart: `./mkdocs.sh`
3. Hard refresh browser (`Ctrl+Shift+R`)

---

## 🚀 Benefits of This System

✅ **No HTML knowledge required** - Just copy/paste templates  
✅ **Consistent formatting** - Automatic icon and style application  
✅ **Easy maintenance** - Update one file, consistent across site  
✅ **VHS link management** - Automatic handling for upcoming vs. past  
✅ **Reusable** - Same pattern can be applied to other pages  
✅ **Version controlled** - Git tracks all changes  
✅ **Future-proof** - Easy to migrate to advanced systems later

---

## 📞 Questions or Issues?

For technical questions about the workshop template system, contact:
- **Developer:** Jane Alesi (ja@satware.ai)
- **CTO:** Michael Wegener (mw@satware.com)

---

**Pro Tip:** Keep the YAML file (`workshops.yml`) updated as a backup reference, even though the website renders from `index.md`. This helps track workshop history and makes bulk updates easier.
