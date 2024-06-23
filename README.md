![Trenecitos!](/web/public/logo.png "Logo")

La app de trenes argentinos pretende que me registre para guardar mis favoritos, tambien tarda mil años en cargar estaciones y otras cosas que aún no se.

Usando la información de la api a la que le pega la app armé esto con Fastpi y Vue que originalmente iba a ser un bot de telegram pero terminó siendo esto.

### Ejecutar

Con Python >= 3.12 y node =>18.20, editá el .env.example.
En el root corrés la api

```
fastapi dev main.py
```

main.py espera que exista un archivo `app/api_auth.py` que genere user/pass para la api de sofse, no está en el repo

en `web/` corres el front

```
npm run dev
```
