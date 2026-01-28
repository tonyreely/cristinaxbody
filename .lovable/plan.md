

## Plan: Adăugare Microsoft Clarity Tracking Code

### Ce voi face
Voi adăuga codul Microsoft Clarity în secțiunea `<head>` a fișierului `index.html`, imediat după codul Meta Pixel existent.

### Modificare exactă

**Fișier:** `index.html`

**Locație:** După linia 44 (după `<!-- End Meta Pixel Code -->`)

**Cod de adăugat:**
```html
<!-- Microsoft Clarity -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "v8k5ejqeye");
</script>
<!-- End Microsoft Clarity -->
```

### Ce NU voi atinge
- Meta Pixel code - rămâne intact
- Meta tags - rămân intacte
- Fonts - rămân intacte
- Favicon - rămâne intact
- Body și noscript fallbacks - rămân intacte
- Toate celelalte fișiere din proiect

### Rezultat
Microsoft Clarity va începe să colecteze date de heatmap și session recordings pentru site-ul tău.

