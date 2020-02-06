Download shapefiles from ISTAT https://www4.istat.it/it/archivio/209722

```
ogr2ogr -f GeoJSON -s_srs ***.prj -t_srs EPSG:4326 provinces.json ***.shp
```

Upload all the files to mapshaper (https://mapshaper.org/) and follow this guide
https://www.amcharts.com/docs/v4/tutorials/creating-custom-maps/

precision=0.0001 id-field=SIGLA

Update provinces.json
