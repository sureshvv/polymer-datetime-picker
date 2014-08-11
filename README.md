Polymer datetime-picker 0.0.1
================

as of this moment, it's in *double secret* beta.  To use:

```
<datetime-picker label='my datetime picker'></datetime-picker>
```

revel in the demo:

http://shmay.github.io/polymer-datetime-picker/

To run the development version locally:

* clone the repo in an empty directory (see next bullet for reasons) & cd into it
* run `bower install` (will install all packages in the parent directory!)
* ` cd ..` then `python -m SimpleHTTPServer`
* go to http://localhost:8000/datetime-picker/demo2.html to see it

Compiling scss/coffee:
* run `npm install`
* `grunt watch` to watch and compile coffee/scss files

To vulcanize for demo purposes:

    vulcanize -o index.html demo.html --inline

