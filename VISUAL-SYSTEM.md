# Brooktrails visual system: Redwood Afterglow

## Brand roles

- Redwood night `#06110F`: the immersive civic field and forest-depth background
- Canopy glass `rgba(10, 31, 27, 0.86)`: navigation, cards, and layered public-service surfaces
- Mist `#EAF2EC`: primary copy against the dark landscape
- Creek light `#6EDAD2`: links, water cues, and interactive energy
- Lantern gold `#F2C56B`: wayfinding, focus states, and resident-action rewards
- Fern `#75C78E`: landscape, parks, and positive status cues
- Ember `#FF735C`: the universal 911 indicator only
- Dusk violet `#A9A0FF`: planning, governance, and secondary civic depth

Trebuchet is the architectural display face: compact, modern, and strong enough for trail-marker headlines. Georgia appears selectively in the softer landscape phrasework. The operating-system sans serif stack remains the practical interface face for navigation, body text, metadata, and forms. The combination stays dependency-free while making the experience feel authored rather than templated.

## Experience idea

Redwood Afterglow treats the district website as a field guide after dusk: deep canopy layers, creek reflections, and lantern-like calls to action. The emotional reward comes from discovering a useful path quickly, without hiding public information behind spectacle.

- topographic linework and local landscape photography create depth without interfering with text
- four non-card gateway metaphors turn the home page into distinct wayfinding: a water-works gauge with moving current, trailhead, public-records cabinet, and folded ranger map with compass
- each service route receives one accent color while retaining a single shared civic system
- restrained reveal and cursor-light effects reward exploration and disappear under reduced-motion preferences
- operational records, notices, and universal safety links remain plain, high contrast, and scannable

## Layout rules

- Base layout is single-column, touch-first, and safe at 320 px.
- The first breakpoint at 38 rem introduces two-column cards and balanced section introductions.
- The main breakpoint at 64 rem introduces full navigation, service grids, and paired story/image layouts.
- Content uses a 76 rem maximum shell with fluid gutters.
- Interactive focus uses a 3 px lantern-gold outline with offset.
- Reduced-motion preferences disable transitions and smooth scrolling.
- Print styling removes navigation and returns all content to high-contrast paper output.

## Reusable components

Gather venue variant (Parks only): two setting buttons share the field-stage font and fern/lantern tokens. A code-native, explicitly illustrative scene opens the Center doors or lights the Grove canopy on selection. A parchment application ticket is the reward; only the chosen venue's PDF appears, followed by a shared staff-confirmation path. Controls and application links retain 44 px targets at phone and compact laptop sizes. No facility photographs, current capacities, prices, availability, or reservation delivery are invented. Motion is selection-triggered and disabled under reduced motion; scoped `.gather-*` styles leave the route-by-component typography and navigation matrix unchanged.

- universal 911 and county-alert utility bar
- sticky district masthead and collapsible mobile navigation
- three-item utility dock for payment access, search, and the District Desk
- site-wide header search with auto-populated page, direct-answer, and document suggestions
- four unique semantic home springboards with shared focus and motion rules
- service switchboard rows for task-first resident outcomes
- page hero with optional local image
- shared field-card dashboard with numbered choice rail and adjacent detail stage
- three-phase transparent golfer sprite for the Parks golf reveal, with address, impact, and full follow-through frames
- guided document shelves, search, result count, and download rows
- resource panels and contact directories
- reviewer-only route disposition deliverable and retained source archive
- district footer with official-site fallback

## Route and component matrix

| Route | Primary accent | Hero role | Main repeated component | Operational emphasis |
|---|---|---|---|---|
| Home | Creek + lantern | Cinematic district field guide | Water-works gauge/current, trailhead, records cabinet, ranger map/compass | Safety strip + three-item utility dock |
| Services | Creek | Task-first hub | Four switchboard rows | Utilities, property, records, human help |
| Water | Creek | Service orientation | Jump rail, resource panels, notices | Billing, system, conservation, sewer |
| Parks & Places | Fern | Outdoor access | Interactive field-card dashboard | Trails, gathering, stewardship, golf |
| Planning | Dusk violet | Project pathway | Process steps | Permits and district confirmation |
| District & Board | Dusk violet | Civic transparency | Seven-question civic dashboard | Representation, meetings, money, rules, operations, work |
| Resources | Creek | Guided public-record library | Seven shelves + search | 48 district files; Fire-only files withheld |
| Archive | Creek | Migration evidence | Expandable retained source text | Fire material retained without a district Fire section |
| District Desk | Lantern | Human help | Masthead utility destination | Consolidated phone, email, fax, office, and golf contacts; intentionally outside primary exploration navigation |
| History / Discover | Lantern | Place narrative | Interactive story dashboard | Origins, forest, water, photos, maps |
| Accessibility / 404 | Creek | Recovery and access | Plain action links | Fast return to a valid destination |

The generated pages use one shared stylesheet and one progressive-enhancement script. Core navigation and content remain usable without JavaScript. Autocomplete, exact-panel opening, retained-source expansion, hover rewards, reveal motion, and mobile navigation enhance directness without hiding the underlying links or records.

## Metallic emerald action variant — 2026-10-04

Home outline variant, 2026-10-05: Services, Parks & Places, District & Board and Discover Brooktrails get a 1.5px masked green-metal perimeter with moving reflection bands. Transparent interior preserves their unique artwork; hover/keyboard focus strengthen the edge to 2px. It never intercepts clicks. Reduced motion keeps a static edge. Owner added the fourth hub to scope; all four now share this edge.

Rental heading: Rent The and the venue name share display font, size, 700 weight, line height and normal tracking/case. Both use 1.4rem ordinarily and 1rem on compact laptops. These are two lines of the same heading, not an eyebrow plus title.

Parks stewardship consolidation: four distinct choices replace five. Care and the park promise share one Give back experience: forest emblem and acreage cue, two direct human-help actions, then expandable rules/plans/committee records. Original source facts and records remain; the former story hash opens the merged care panel.

Expanded to every shared .button action (including light, ghost, outline and replay variants) and the golfer's phone reveal. Navigation, text links, story/shelf selectors, rustic trail-sign links, and the golfer sprite remain separate roles. Common material styling does not change positioning or reveal timing. Plain-text buttons use a behind-text sweep; the obsolete hover-only overlay is removed.

Gathering's selected application ticket is one full-surface anchor. The District Desk course telephone tile shares its polished green metal variant, translated from Alpha's actual --alpha-gold-material and gold-button sweep: seven reflection bands at 105 degrees, bright mint highlights, green shadow bands, beveled edge, and an 88-percent white diagonal sweep every 4.8 seconds. Dark ink text sits above the moving shine. Existing PDF/tel targets remain; reduced-motion disables the sweep. The prior dark brushed treatment was rejected by the owner and is superseded. No Fire or production changes.
