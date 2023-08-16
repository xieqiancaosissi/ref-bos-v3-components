const NETWORKS = [
  {
    name: "ZKEVM",
    chainId: 1101,
    dex: "QuickSwap",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcng9IjEwIiBmaWxsPSIjMEYxMTI2Ii8+CjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcng9IjEwIiBmaWxsPSJ1cmwoI3BhdHRlcm4wKSIvPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InBhdHRlcm4wIiBwYXR0ZXJuQ29udGVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgd2lkdGg9IjEiIGhlaWdodD0iMSI+Cjx1c2UgeGxpbms6aHJlZj0iI2ltYWdlMF81MV82MTUiIHRyYW5zZm9ybT0ic2NhbGUoMC4wMzEyNSkiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF81MV82MTUiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDQUFBQUFnQ0FZQUFBQnplbnIwQUFBSzJtbERRMUJKUTBNZ1VISnZabWxzWlFBQVNJbVZsd2RVRTlrYWdPL01wQmRhQUFFcG9YZWtFMEJLNktFSTBrRlVRaEpJS0NFbUJCVlJVVmxjd2JXZ0lnTHFpcTZLS0xpNkFySVd4SUp0VWJEWERiSUlxT3Rpd1lhYW5jQWo3TzQ3Nzczei9uUHUzTy84ODkrLzNIUHZuSDhBb0lheFJhSmNXQTJBUEdHQk9EWTBnSjZja2tySER3SUlZQUVKbUFLRXpaR0ltREV4a1FDVnlmbnY4dTQyYW8zS0RYdUZyMzkvLzE5Rmc4dVRjQUNBMGxETzRFbzRlU2gzb09NWlJ5UXVBQUE1aU9wTkZ4YUlGSHdkWlUweG1pREt2eWs0YTRJL0tEaGpuREdVY1p2NDJFQ1U2UUFRS0d5Mk9Bc0FpaDJxcHhkeXNsQS9GRVVOamtLdVFJaHlNY3ErSEQ2YmkvSUpsTzN5OHZJVlBJU3lGV292QW9DSzdnNWdaUHpGWjliZi9HY28vYlBaV1VxZXFHdGNDRUVDaVNpWHZmai8zSnIvTFhtNTBza1lGdWlnOE1WaHNZcDQ2UDdkemNtUFVMSXdZMWIwSkF1NEV6a3BtQzhOUzVoa2ppUXdkWks1N0tBSTVkcmNXWkdUbkNrSVlTbjlGTERpSjVrbkNZNmJaSEYrckRKV3BqaVFPY2xzOFhoY0Vzb3lhVTZDVXMvbnNaVCtpL2p4U1pOY0tFaWNOY21TbkxpSUtadEFwVjRzalZYbXp4T0dCa3pGRFZIV25pZjVTNzBDbG5KdEFUOCtURms3ZXlwL25wQTU1Vk9Tck15Tnl3c0tuckpKVU5xTENnS1VzVVM1TVVwN1htNm9VaThwakZPdUxVQVA1OVRhR09VZVpyUERZeVlaQ0VBVVlBTU9YWFdTQUNqZ0xTcFFGQktZTDFvc0ZtVHhDK2hNOUxieDZDd2h4OEdPN3V6bzdBS0E0dTVPSEllUmErTjNFdEpWbjlLVmJRTEFEeXVYeTF1bWRHR1hBVGhTQVFEWmRVcG5pUjVVRmZUY1h3emdTTVdGRXpxTTRxSDRJcWdDVGFBTERORXZneFd3Qjg3QUhYZ0RmeEFNd2tFMGlBY3BZQjZhS3gva0FURllDSXJCQ2xBR0tzQUdzQVhVZ0oxZ045Z1BEb0Vqb0JXY0FHZkFCWEFGWEFlM3dBTWdBd1BnT1JnQjc4QVlCRUY0aUFyUklGM0lDREtIYkNGbmlBSDVRc0ZRSkJRTHBVRHBVQllraEtSUU1iUUtxb0Fxb1Jwb0Y5UUEvUWdkaDg1QWw2QWU2QjdVQncxRHI2RlBNQUpUWUUzWUFMYUFaOEFNbUFsSHdQSHdYRGdMWGdBWHdhWHdPcmdhcm9jUHdpM3dHZmdLZkF1V3djL2hVUVFnWkVRYk1VYnNFUVlTaUVRanFVZ21Ja2FXSWVWSUZWS1BOQ0h0U0JkeUE1RWhMNUNQR0J5R2hxRmo3REhlbURCTUFvYURXWUJaaGxtTHFjSHN4N1Jnem1GdVlQb3dJNWl2V0NwV0gydUw5Y0t5c01uWUxPeENiQm0yQ3JzWGV3eDdIbnNMTzRCOWg4UGh0SEdXT0E5Y0dDNEZsNDFiZ2x1TDI0NXJ4blhnZW5EOXVGRThIcStMdDhYNzRLUHhiSHdCdmd5L0RYOFFmeHJmaXgvQWZ5Q1FDVVlFWjBJSUlaVWdKS3drVkJFT0VFNFJlZ21EaERHaUd0R2M2RVdNSm5LSmk0bnJpWHVJN2NScnhBSGlHRW1kWkVueUljV1Rza2tyU05Xa0p0SjUwa1BTR3pLWmJFTDJKTThtQzhnbDVHcnlZZkpGY2gvNUkwV0RZa01KcEtSUnBKUjFsSDJVRHNvOXloc3FsV3BCOWFlbVVndW82NmdOMUxQVXg5UVBLalFWQnhXV0NsZGx1VXF0U290S3I4cExWYUtxdVNwVGRaNXFrV3FWNmxIVmE2b3YxSWhxRm1xQmFteTFaV3ExYXNmVjdxaU5xdFBVbmRTajFmUFUxNm9mVUwra1BxU0IxN0RRQ05iZ2FwUnE3Tlk0cTlGUFEyaW10RUFhaDdhS3RvZDJuamFnaWRPMDFHUnBabXRXYUI3UzdOWWMwZExRY3RWSzFGcWtWYXQxVWt1bWpXaGJhTE8wYzdYWGF4L1J2cTM5YVpyQk5PWTAzclExMDVxbTlVNTdyek5keDErSHAxT3UwNnh6UytlVExsMDNXRGRIZDZOdXErNGpQWXllamQ1c3ZZVjZPL1RPNjcyWXJqbmRlenBuZXZuMEk5UHY2OFA2TnZxeCtrdjBkK3RmMVI4MU1EUUlOUkFaYkRNNGEvRENVTnZRM3pEYmNMUGhLY05oSTVxUnI1SEFhTFBSYWFObmRDMDZrNTVMcjZhZm80OFk2eHVIR1V1TmR4bDNHNCtaV0pva21LdzBhVFo1WkVveVpaaG1tbTQyN1RRZE1UTXlpeklyTm1zMHUyOU9OR2VZODgyM21uZVp2N2V3dEVpeVdHM1JhakZrcVdQSnNpeXliTFI4YUVXMThyTmFZRlZ2ZGRNYVo4Mnd6ckhlYm4zZEJyWnhzK0hiMU5wY3M0VnQzVzBGdHR0dGUreXdkcDUyUXJ0NnV6djJGSHVtZmFGOW8zMmZnN1pEcE1OS2gxYUhselBNWnFUTzJEaWphOFpYUnpmSFhNYzlqZytjTkp6Q25WWTZ0VHU5ZHJaeDVqalhPdDkwb2JxRXVDeDNhWE41NVdycnluUGQ0WHJYamVZVzViYmFyZFB0aTd1SHU5aTl5WDNZdzh3ajNhUE80dzVEa3hIRFdNdTQ2SW4xRFBCYzdubkM4Nk9YdTFlQjF4R3ZQN3p0dlhPOEQzZ1B6YlNjeVp1NVoyYS9qNGtQMjJlWGo4eVg3cHZ1KzcydnpNL1lqKzFYNy9mRTM5U2Y2Ny9YZjVCcHpjeG1IbVMrREhBTUVBY2NDM2dmNkJXNE5MQWpDQWtLRFNvUDZnN1dDRTRJcmdsK0hHSVNraFhTR0RJUzZoYTZKTFFqREJzV0ViWXg3QTdMZ01WaE5iQkd3ajNDbDRhZmk2QkV4RVhVUkR5SnRJa1VSN1pId1ZIaFVadWlIczR5bnlXYzFSb05vbG5SbTZJZnhWakdMSWo1ZVRadWRzenMydGxQWTUxaWkyTzc0bWh4OCtNT3hMMkxENGhmSC84Z3dTcEJtdENacUpxWWx0aVErRDRwS0treVNaWThJM2xwOHBVVXZSUkJTbHNxUGpVeGRXL3E2SnpnT1Z2bURLUzVwWldsM1o1ck9YZlIzRXZ6OU9ibHpqczVYM1UrZS83UmRHeDZVdnFCOU0vc2FIWTllelNEbFZHWE1jSUo1R3psUE9mNmN6ZHpoM2srdkVyZVlLWlBabVhtVUpaUDFxYXNZYjRmdjRyL1FoQW9xQkc4eWc3TDNwbjlQaWM2WjErT1BEY3B0em1Qa0plZWQxeW9JY3dSbnNzM3pGK1UzeU95RlpXSlpBdThGbXhaTUNLT0VPK1ZRSks1a3JZQ1RiUkp1aXExa240ajdTdjBMYXd0L0xBd2NlSFJSZXFMaEl1dUxyWlp2R2J4WUZGSTBROUxNRXM0U3pxTGpZdFhGUGN0WlM3ZHRReGFsckdzYzducDh0TGxBeVdoSmZ0WGtGYmtyUGhscGVQS3lwVnZWeVd0YWk4MUtDMHA3ZjhtOUp2R01wVXljZG1kMWQ2cmQzNkwrVmJ3YmZjYWx6WGIxbnd0NTVaZnJuQ3NxS3I0dkphejl2SjNUdDlWZnlkZmw3bXVlNzM3K2gwYmNCdUVHMjV2OU51NHYxSzlzcWl5ZjFQVXBwYk45TTNsbTk5dW1iL2xVcFZyMWM2dHBLM1NyYkxxeU9xMmJXYmJObXo3WE1PdnVWVWJVTnRjcDErM3B1NzlkdTcyM2gzK081cDJHdXlzMlBucGU4SDNkM2VGN21xcHQ2aXYybzNiWGJqNzZaN0VQVjAvTUg1bzJLdTN0Mkx2bDMzQ2ZiTDlzZnZQTlhnME5CelFQN0MrRVc2VU5nNGZURHQ0L1ZEUW9iWW0rNlpkemRyTkZZZkJZZW5oWnorbS8zajdTTVNSenFPTW8wMC9tZjlVZDR4MnJMd0ZhbG5jTXRMS2I1VzFwYlQxSEE4LzN0bnUzWDdzWjRlZjk1MHdQbEY3VXV2aytsT2tVNlduNUtlTFRvOTJpRHBlbk1rNjA5ODV2L1BCMmVTek44L05QdGQ5UHVMOHhRc2hGODUyTWJ0T1gvUzVlT0tTMTZYamx4bVhXNis0WDJtNTZuYjEyQzl1dnh6cmR1OXV1ZVp4cmUyNjUvWDJucGs5cDNyOWVzL2NDTHB4NFNicjVwVmJzMjcxM0U2NGZmZE8yaDNaWGU3ZG9YdTU5MTdkTDd3LzlxRGtJZlpoK1NPMVIxV1A5Ui9YLzJyOWE3UE1YWGF5TDZqdjZwTzRKdy82T2YzUGY1UDg5bm1nOUNuMWFkV2cwV0REa1BQUWllR1E0ZXZQNWp3YmVDNTZQdmFpN0hmMTMrdGVXcjM4NlEvL1A2Nk9KSThNdkJLL2tyOWUrMGIzemI2M3JtODdSMk5HSDcvTGV6ZjJ2dnlEN29mOUh4a2Z1ejRsZlJvY1cvZ1ovN242aS9XWDlxOFJYeC9LOCtSeUVWdk1IbThGRUhUQW1aa0F2TjZIOXNZcEFORFF2cHcwWjZLM0hoZG80bjlnbk1CLzRvbitlMXpjQVdoQ0owVmI1TjhCd0ZGRk8rdVAraTRCSUJxZDQvMEI3T0tpSFA4U1NhYUw4NFF2bFVZQThNWnkrZXQ4QUlqbytCd3FsNC9GeU9WZjZ0Qmtid0p3YW1paXAxY0lEdTNsbTJqblg2dnllcitXbElCL3lFUy8vNWNhL3prRFJRYXU0Si96bi9SNkdmK3ZQbk92QUFBQU9HVllTV1pOVFFBcUFBQUFDQUFCaDJrQUJBQUFBQUVBQUFBYUFBQUFBQUFDb0FJQUJBQUFBQUVBQUFBZ29BTUFCQUFBQUFFQUFBQWdBQUFBQUk5T1FNa0FBQWM5U1VSQlZGZ0p4VmQ3VkZSMUh2ODRnTUJNekRBOEZIRFVPUzZ2aUN4cmEyMUJnOVhDc21RMWQ4dWpFclcyNW5iY090dXV0bjkwMnJMTzhiVFdtbVV1QitxVVlabXZ6ZGN1U0NUSHdKT3RydmtBa1dFRlNoaEJuZ01ETXpFTWV6Ky80WGU3TTQ2cGYrM3ZuUHY0ZmQvdjM3M0EvM21OdTFIOVJVVkZQOHZMeTd0MWNIRFFPand5RWtQK3NKQ1FicjFlMzF4ZVhuNW01Y3FWeDI1VTVqWHBxZlRVbVRQdkRnd01kQTBQRDQ5ZWJSRkhHdEtTNTVxQ3IwV1FsWlVWWmJQWlNnZWNReU5YVXhvTWZ2eEU3U2lOSVM5bFhFdFBVRHc5b0RlQkNpNzNEWTFXMTNlT2JpcHI4cnNJSTQ3Ry9tMVRxY3BHR1Q4V2phQTFjUGp3NFdYWjJka2ZoWWFHcXNiVm5PL0M3bVB0T05udUZMRFFFQi9PTStJUisyN1hDR1ltNlBGemZSTWFXdnZ3MnBvQ2xkZmo4YUMxdGZVcHE5VmFvZ0xIWG5TQmdFRGxuUTRYL3JDMURyL2JZVU9idzQwWkV3M2ltaFlWZ3RqeHdLTHA4VUlFbGIvMmFDcU8vNmNKVmQxbXdVTmVMam95YWRLa1lzb1dBTTB0UlBNT2hpby9QLytmMG5PYnZSOFBiVG1EQ01YTTJWWVQ0bThhRDdmSEM2ZmJnd3Y5STdndjNZelZlVmFZdzNYNDQ4UEpxS3c4aHZjT25vZDUray9SMXU5R1VZMGRjMU5OaUkwS2gwNm5nOFZpV2FSY1pRY09IR2lWZXYxUzBOYlcxcENZbUpoQ0pKVXZMcW5GbktsR21DSkQwVGZrRVlyNzNDUElTakZqeVQwSmlETkdDRG5PUVpkMy9WLy9ydHV3K1N1a3JuNE9NUkUvK01YVTdGcHhDMUlTZmJYb2REcTdsVGEyMXRUVTlKTlpUY0haczJmWFNPVU0zVzlMNjBWT3Rjb040YUY0cCtCbXJKcGpRVTFERDE1OGVhTXdJTnFVcTR1TmljZm5YMjdHS3c5TVJZNFNMU3JtUldNb1M2YkRZRERFRkJjWHJ4V015azJOQUt1VlNDSmUzdG1BNnUrY3lKNXN1TUp6aG54bDhXbU1yLzhDNjljOTdhMnZ2NkF6bVl4SS9vbEZ5aFJQUnVYOUx5L3A5cHkrTEF4WmxCNkRsMzZWcXVMeTdwOGJ6U2dJQTdTRnB3MDljNTA1eFlnYVc0OWdYREl6QVZtcFppZ1o4UnIwckl3ckZ6MXRhYnlBZ1FHWFVuZ1QwTzZKRk4xVDJlTHdTMFZMUzR2b0N0RkxTbUhNazRWWGRyb0xFd3poUWpLVlB6a3J3VHNsTmx4SHhUTG5DbElvYi96dlJVRVhIUitIYUgyb3FIYlN4TjJSSVVKKzVJc2oyRkw4RDh5OE93MHprMzZCajZ2dFNoUjh0ZUQxZW4rcE1KZUlDTWp3TTJ5L2VmK2N6aFR1SzZMTlQyVGdyVStQNHZtbHM0VWkzdGpUY2pXM1hNTGNSNTZIczdzVHViTm1ZUDZEczdCNFlaNWZkQmpSd3JlcUJNdGtpMFhVRUkya25MQ3dzSEhqT0NxcnE2c2RwQ0F4QzJhaUVtTWFVZlRVZE1ISXNCN2NYNDdHeGlhY2I3aUlubDRuek5FR3BLVmF3T0xiWEhJQ2ZRNG4rcDE5bUpnMGlnODNyY1c5cys4UXZMeVJmMG5KT1hRNDNXb2FhRUJPVGs0NlU1REVEVlBRNGZoZUZBd05ZTHR4Ylh4N0cvNjhiaitpRENheG41ak9Zak9oK1d3UHFvNmVVNVIrQlV0aUVreEdnN2d3Q3N5ZDh3eEtQbmdCankvTkZ6ejArQy96cDRoaFJoMHBpUUtNZ29LQ2FGRURNditkL2Q4TFRKZnk0SWg5N0oyVE9LRjRSK1dXZSs5RTdQUzdmSnhqZDlMMDFaNUUvOGw2UDdnMTR4NnNLRndQNitUSmFpU3kwbUtWdG02RjFDRVpoQUV5QXJxT0N3bzhSQ2duUWJzeWZLeVBMOGRnaDYvWTVOeVh6SHpTcU9IMmRyamFmSjBpY1RSaThiSS80ZkszbFJLRUIyZjR4allCMG1tL1ZrcEtNTU43dEFMeW9DRWhsZW9uV01URmZiQmx2TzEyVVFPQnVBRlhQUFo4ZGtnRloweTZDWEZSeWdHaUxEcTlkZXZXWHAweURNNUxDZzZVUzdWVnd1TkFJNEo1TC9tR0x0bEZBY3E5ZkxJMnR1Lzh3UUN6SVF4cGlRYUJaZ1NvVzBTZ3VibjVhMEt0VXhOdys2MnBhQzByRlo1cmpaQkNBNTgwclB1YlNyVkkyUTNhdGIvQ2x6N0N4SXdZT3ovc2RydU5NR0dBMiszZXpRMnRtajh2RzYyMTM2SnAyNFlySWtFYXVhUnhGMHMvRVhOZ2RLUVJ2VDJuSkZwOWVucGEvR2FIUlBUMjl1N2d1eGhFeWl4SUt6LzBlUjNISzN2MjVzejVrZzRKdCtTQU9SNGZtNkRDK01McXArY2NRdG8xTGlUWjE0NWp3SXYyTmd4MWJOZVNDSU00QTVnQzlURGk5MXR5Y3ZKU1VuNjRiYTlvbytoRXZXRHN0UStDNzRhWU9LRlE3djJram0wQ0RTRFlkdXBOUDlLbXBxYUQwNlpOZTRoQXRRc0tDd3RYY1JRVHlBR3k4TmRab0NJdWFZajBWdTRGVW5NTFZNNTZlR2JGblJvS1gvVlhWRlNzazBBMUFnUm9UMFcyeVFQNXExRjE2QnZWQU1rVTdCbW9uRFFNZjJmekIzNW5RMjF0N2RyTXpNelhwUXcxQWdUazV1YVdLaDJ4amU4c3lJcURXL0QwN3g5VkkwRjRzQlZNT2IwdjI3VUcybU9ib2RjcXB5dy9Bd2hJU1VsWlJrSytjNzM5eG5QWXMzZURhRStaRXNKWkQxUWNiYjdOcitpb09DTEpqSC90ZmxZZHc2U256T1hMbHkvaHUzYjVwVUNMNE45TlJucjZLamt5V1IvSGo5ZnBkdTA5Z3FxNmZqRjZaYy96SUtMU25Jd281VmpPUU43OXM5V3dNNVdNS2gzVHlyK3VkOVpFc0o4VC9uellHcjhiMVY3OEtRbGNwS09NNjFKMk5TSitML0NETlpnaGdRcmxuclIxZFhXdlhzOXYyVlZURU13Zy9qY3NXTEJnM3REUTBGMFJFUkdwUnFNeGxuUU9oNlBMNVhJMVJFWkcvbnZmdm4xbE4vS0gvRC93c3k4cHFET2lWUUFBQUFCSlJVNUVya0pnZ2c9PSIvPgo8L2RlZnM+Cjwvc3ZnPgo=",
  },
  {
    name: "ZKEVM",
    chainId: 1101,
    dex: "Balancer",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcng9IjEwIiBmaWxsPSJ1cmwoI3BhdHRlcm4wKSIvPgo8ZGVmcz4KPHBhdHRlcm4gaWQ9InBhdHRlcm4wIiBwYXR0ZXJuQ29udGVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgd2lkdGg9IjEiIGhlaWdodD0iMSI+Cjx1c2UgeGxpbms6aHJlZj0iI2ltYWdlMF81MV82MzciIHRyYW5zZm9ybT0ic2NhbGUoMC4wMzEyNSkiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF81MV82MzciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDQUFBQUFnQ0FJQUFBRDhHTzJqQUFBSzJtbERRMUJKUTBNZ1VISnZabWxzWlFBQVNJbVZsd2RVRTlrYWdPL01wQmRhQUFFcG9YZWtFMEJLNktFSTBrRlVRaEpJS0NFbUJCVlJVVmxjd2JXZ0lnTHFpcTZLS0xpNkFySVd4SUp0VWJEWERiSUlxT3Rpd1lhYW5jQWo3TzQ3Nzczei9uUHUzTy84ODkrLzNIUHZuSDhBb0lheFJhSmNXQTJBUEdHQk9EWTBnSjZja2tySER3SUlZQUVKbUFLRXpaR0ltREV4a1FDVnlmbnY4dTQyYW8zS0RYdUZyMzkvLzE5Rmc4dVRjQUNBMGxETzRFbzRlU2gzb09NWlJ5UXVBQUE1aU9wTkZ4YUlGSHdkWlUweG1pREt2eWs0YTRJL0tEaGpuREdVY1p2NDJFQ1U2UUFRS0d5Mk9Bc0FpaDJxcHhkeXNsQS9GRVVOamtLdVFJaHlNY3ErSEQ2YmkvSUpsTzN5OHZJVlBJU3lGV292QW9DSzdnNWdaUHpGWjliZi9HY28vYlBaV1VxZXFHdGNDRUVDaVNpWHZmai8zSnIvTFhtNTBza1lGdWlnOE1WaHNZcDQ2UDdkemNtUFVMSXdZMWIwSkF1NEV6a3BtQzhOUzVoa2ppUXdkWks1N0tBSTVkcmNXWkdUbkNrSVlTbjlGTERpSjVrbkNZNmJaSEYrckRKV3BqaVFPY2xzOFhoY0Vzb3lhVTZDVXMvbnNaVCtpL2p4U1pOY0tFaWNOY21TbkxpSUtadEFwVjRzalZYbXp4T0dCa3pGRFZIV25pZjVTNzBDbG5KdEFUOCtURms3ZXlwL25wQTU1Vk9Tck15Tnl3c0tuckpKVU5xTENnS1VzVVM1TVVwN1htNm9VaThwakZPdUxVQVA1OVRhR09VZVpyUERZeVlaQ0VBVVlBTU9YWFdTQUNqZ0xTcFFGQktZTDFvc0ZtVHhDK2hNOUxieDZDd2h4OEdPN3V6bzdBS0E0dTVPSEllUmErTjNFdEpWbjlLVmJRTEFEeXVYeTF1bWRHR1hBVGhTQVFEWmRVcG5pUjVVRmZUY1h3emdTTVdGRXpxTTRxSDRJcWdDVGFBTERORXZneFd3Qjg3QUhYZ0RmeEFNd2tFMGlBY3BZQjZhS3gva0FURllDSXJCQ2xBR0tzQUdzQVhVZ0oxZ045Z1BEb0Vqb0JXY0FHZkFCWEFGWEFlM3dBTWdBd1BnT1JnQjc4QVlCRUY0aUFyUklGM0lDREtIYkNGbmlBSDVRc0ZRSkJRTHBVRHBVQllraEtSUU1iUUtxb0Fxb1Jwb0Y5UUEvUWdkaDg1QWw2QWU2QjdVQncxRHI2RlBNQUpUWUUzWUFMYUFaOEFNbUFsSHdQSHdYRGdMWGdBWHdhWHdPcmdhcm9jUHdpM3dHZmdLZkF1V3djL2hVUVFnWkVRYk1VYnNFUVlTaUVRanFVZ21Ja2FXSWVWSUZWS1BOQ0h0U0JkeUE1RWhMNUNQR0J5R2hxRmo3REhlbURCTUFvYURXWUJaaGxtTHFjSHN4N1Jnem1GdVlQb3dJNWl2V0NwV0gydUw5Y0t5c01uWUxPeENiQm0yQ3JzWGV3eDdIbnNMTzRCOWg4UGh0SEdXT0E5Y0dDNEZsNDFiZ2x1TDI0NXJ4blhnZW5EOXVGRThIcStMdDhYNzRLUHhiSHdCdmd5L0RYOFFmeHJmaXgvQWZ5Q1FDVVlFWjBJSUlaVWdKS3drVkJFT0VFNFJlZ21EaERHaUd0R2M2RVdNSm5LSmk0bnJpWHVJN2NScnhBSGlHRW1kWkVueUljV1Rza2tyU05Xa0p0SjUwa1BTR3pLWmJFTDJKTThtQzhnbDVHcnlZZkpGY2gvNUkwV0RZa01KcEtSUnBKUjFsSDJVRHNvOXloc3FsV3BCOWFlbVVndW82NmdOMUxQVXg5UVBLalFWQnhXV0NsZGx1VXF0U290S3I4cExWYUtxdVNwVGRaNXFrV3FWNmxIVmE2b3YxSWhxRm1xQmFteTFaV3ExYXNmVjdxaU5xdFBVbmRTajFmUFUxNm9mVUwra1BxU0IxN0RRQ05iZ2FwUnE3Tlk0cTlGUFEyaW10RUFhaDdhS3RvZDJuamFnaWRPMDFHUnBabXRXYUI3UzdOWWMwZExRY3RWSzFGcWtWYXQxVWt1bWpXaGJhTE8wYzdYWGF4L1J2cTM5YVpyQk5PWTAzclExMDVxbTlVNTdyek5keDErSHAxT3UwNnh6UytlVExsMDNXRGRIZDZOdXErNGpQWXllamQ1c3ZZVjZPL1RPNjcyWXJqbmRlenBuZXZuMEk5UHY2OFA2TnZxeCtrdjBkK3RmMVI4MU1EUUlOUkFaYkRNNGEvRENVTnZRM3pEYmNMUGhLY05oSTVxUnI1SEFhTFBSYWFObmRDMDZrNTVMcjZhZm80OFk2eHVIR1V1TmR4bDNHNCtaV0pva21LdzBhVFo1WkVveVpaaG1tbTQyN1RRZE1UTXlpeklyTm1zMHUyOU9OR2VZODgyM21uZVp2N2V3dEVpeVdHM1JhakZrcVdQSnNpeXliTFI4YUVXMThyTmFZRlZ2ZGRNYVo4Mnd6ckhlYm4zZEJyWnhzK0hiMU5wY3M0VnQzVzBGdHR0dGUreXdkcDUyUXJ0NnV6djJGSHVtZmFGOW8zMmZnN1pEcE1OS2gxYUhselBNWnFUTzJEaWphOFpYUnpmSFhNYzlqZytjTkp6Q25WWTZ0VHU5ZHJaeDVqalhPdDkwb2JxRXVDeDNhWE41NVdycnluUGQ0WHJYamVZVzViYmFyZFB0aTd1SHU5aTl5WDNZdzh3ajNhUE80dzVEa3hIRFdNdTQ2SW4xRFBCYzdubkM4Nk9YdTFlQjF4R3ZQN3p0dlhPOEQzZ1B6YlNjeVp1NVoyYS9qNGtQMjJlWGo4eVg3cHZ1KzcydnpNL1lqKzFYNy9mRTM5U2Y2Ny9YZjVCcHpjeG1IbVMrREhBTUVBY2NDM2dmNkJXNE5MQWpDQWtLRFNvUDZnN1dDRTRJcmdsK0hHSVNraFhTR0RJUzZoYTZKTFFqREJzV0ViWXg3QTdMZ01WaE5iQkd3ajNDbDRhZmk2QkV4RVhVUkR5SnRJa1VSN1pId1ZIaFVadWlIczR5bnlXYzFSb05vbG5SbTZJZnhWakdMSWo1ZVRadWRzenMydGxQWTUxaWkyTzc0bWh4OCtNT3hMMkxENGhmSC84Z3dTcEJtdENacUpxWWx0aVErRDRwS0treVNaWThJM2xwOHBVVXZSUkJTbHNxUGpVeGRXL3E2SnpnT1Z2bURLUzVwWldsM1o1ck9YZlIzRXZ6OU9ibHpqczVYM1UrZS83UmRHeDZVdnFCOU0vc2FIWTllelNEbFZHWE1jSUo1R3psUE9mNmN6ZHpoM2srdkVyZVlLWlBabVhtVUpaUDFxYXNZYjRmdjRyL1FoQW9xQkc4eWc3TDNwbjlQaWM2WjErT1BEY3B0em1Qa0plZWQxeW9JY3dSbnNzM3pGK1UzeU95RlpXSlpBdThGbXhaTUNLT0VPK1ZRSks1a3JZQ1RiUkp1aXExa240ajdTdjBMYXd0L0xBd2NlSFJSZXFMaEl1dUxyWlp2R2J4WUZGSTBROUxNRXM0U3pxTGpZdFhGUGN0WlM3ZHRReGFsckdzYzducDh0TGxBeVdoSmZ0WGtGYmtyUGhscGVQS3lwVnZWeVd0YWk4MUtDMHA3ZjhtOUp2R01wVXljZG1kMWQ2cmQzNkwrVmJ3YmZjYWx6WGIxbnd0NTVaZnJuQ3NxS3I0dkphejl2SjNUdDlWZnlkZmw3bXVlNzM3K2gwYmNCdUVHMjV2OU51NHYxSzlzcWl5ZjFQVXBwYk45TTNsbTk5dW1iL2xVcFZyMWM2dHBLM1NyYkxxeU9xMmJXYmJObXo3WE1PdnVWVWJVTnRjcDErM3B1NzlkdTcyM2gzK081cDJHdXlzMlBucGU4SDNkM2VGN21xcHQ2aXYybzNiWGJqNzZaN0VQVjAvTUg1bzJLdTN0Mkx2bDMzQ2ZiTDlzZnZQTlhnME5CelFQN0MrRVc2VU5nNGZURHQ0L1ZEUW9iWW0rNlpkemRyTkZZZkJZZW5oWnorbS8zajdTTVNSenFPTW8wMC9tZjlVZDR4MnJMd0ZhbG5jTXRMS2I1VzFwYlQxSEE4LzN0bnUzWDdzWjRlZjk1MHdQbEY3VXV2aytsT2tVNlduNUtlTFRvOTJpRHBlbk1rNjA5ODV2L1BCMmVTek44L05QdGQ5UHVMOHhRc2hGODUyTWJ0T1gvUzVlT0tTMTZYamx4bVhXNis0WDJtNTZuYjEyQzl1dnh6cmR1OXV1ZVp4cmUyNjUvWDJucGs5cDNyOWVzL2NDTHB4NFNicjVwVmJzMjcxM0U2NGZmZE8yaDNaWGU3ZG9YdTU5MTdkTDd3LzlxRGtJZlpoK1NPMVIxV1A5Ui9YLzJyOWE3UE1YWGF5TDZqdjZwTzRKdy82T2YzUGY1UDg5bm1nOUNuMWFkV2cwV0REa1BQUWllR1E0ZXZQNWp3YmVDNTZQdmFpN0hmMTMrdGVXcjM4NlEvL1A2Nk9KSThNdkJLL2tyOWUrMGIzemI2M3JtODdSMk5HSDcvTGV6ZjJ2dnlEN29mOUh4a2Z1ejRsZlJvY1cvZ1ovN242aS9XWDlxOFJYeC9LOCtSeUVWdk1IbThGRUhUQW1aa0F2TjZIOXNZcEFORFF2cHcwWjZLM0hoZG80bjlnbk1CLzRvbitlMXpjQVdoQ0owVmI1TjhCd0ZGRk8rdVAraTRCSUJxZDQvMEI3T0tpSFA4U1NhYUw4NFF2bFVZQThNWnkrZXQ4QUlqbytCd3FsNC9GeU9WZjZ0Qmtid0p3YW1paXAxY0lEdTNsbTJqblg2dnllcitXbElCL3lFUy8vNWNhL3prRFJRYXU0Si96bi9SNkdmK3ZQbk92QUFBQU9HVllTV1pOVFFBcUFBQUFDQUFCaDJrQUJBQUFBQUVBQUFBYUFBQUFBQUFDb0FJQUJBQUFBQUVBQUFBZ29BTUFCQUFBQUFFQUFBQWdBQUFBQUk5T1FNa0FBQUtwU1VSQlZFZ043VmJQYnlsUkZOWStHd2xkVklTb1JnaUpZQ0ZJYWtNclltM0R3dHJLenJZci80Q0ZoYi9BUmlMK2hRWWJpVlJVR20wMHRCWmE0a2VGUkVoRTZuMDZ5Y3lZdWRQbjhlemVUU2E1Yys0NTMzZm5uUFBkT3lmcjlWb2tNTHJkYmlhVHFkVnFyVmFyMld4K2ZuN1Nqbks1M0dnMEdnd0dtODBXRG9mVmFqVzl4SjJBZ0QvdTcrOERnUURYVmZnOUZBclY2M1UrRGl3aXZqV2J6UXBEQ2E2SXhlSjhQczlITytWSFBEdzg4STEvdEt4V3EwS2hRSERqY3lMWGY1VWZDaFJabWt3bWZEUkNpaWdubENFU2lVaWxVc0ttV0NaVU94cU5DaFVBVUNkNFdQNkVhYnZkYmpRYWIyOXZ3K0dRWGxZb0ZIcTkzbVF5NlhRNjJraWNrQWtXaTBVdWx5c1dpNlBSQ0JCMnUvM3k4cElUMytsMHF0WHE0K01qSEs2dnI0UEJvRVFpNGZoc1hqbFpTNlZTRG9jRExVRncvZEdFRUpmTGxVNm5PWUFNQVdwcnRWcC9CTmxwRVRUeitaeW1ZUWpRQmpzQjdPQ0VzdE1FakE3T3pzNTJpTjNKWmJsY01uNDAxY2ZIeDhYRkJiT3c3d3dneURZTnk2UUlKaWpsOXZaMmJ4cWNmZkY0bkYwQVlKTGI5T25wQ2JwSG01WktKWHpaRHg4RFVGVFY3WGI3L1g2aUpzZ0ViTVRwZFByKy9zNVdHYldxMVdwVktoVzU5MW54V3dUajhiaGNMbGNxRld3ZlI0WEZZc0h1T0NxREJtZXoyV0F3Z0hPdjEzdjVIdjErMytQeDNOemNPSjNPcTZ1cjgvTnpob0txQms2Q1BRNDRCb1UxZytMUThVZ3NoYndwY2l3VzIwTzZMRXpDRklBb09NQi9JY1hKWlBMcjY0dmdkWUFKZ09nUm1Vd20yanhIRytpQ1U1VGxhUGdpczlrc1FqWFF5OGZnQU94R1E2Z0RCSXpMNngvV0dWQm9IRXJTekZHQkF5U1JTS0R4RC9rYXI5ZUxHNFY5T1c4SmpZS0dndTd1N3ZCdjhmejgvUHI2aWtzTkF6OE5IR0pzVTZsVW9vd2FqUWEvWDFDbHorZmJrdGgzQUlHQUEzVGdLM01mSEFna0ZQNmZRQ2d6dFAzb0tmb054cWxNdUNzc242SUFBQUFBU1VWT1JLNUNZSUk9Ii8+CjwvZGVmcz4KPC9zdmc+Cg==",
  },
  {
    name: "ZKEVM",
    chainId: 1101,
    dex: "Pancake Swap",
    icon: "https://repository-images.githubusercontent.com/440462673/6872d684-f7ed-463c-9a5c-76542eddbcc4",
  },
];

const NETWORK_ZKSYNC = "ZKSYNC";
const NETWORK_ZKEVM = "ZKEVM";

const NETWORK_POLYGON = "POLYGON";

const arrowDown = (
  <svg
    width="17"
    height="9"
    viewBox="0 0 17 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L8.5 7.5L16 1"
      stroke="#8C7EBD"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

const ArrowDownWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 12px;
`;

const exchangeIcon = (
  <svg
    width="15"
    height="16"
    viewBox="0 0 15 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1_142_586" fill="white">
      <path d="M5.79546 15.303L5.79546 0.173912C5.79546 0.127788 5.7775 0.0835524 5.74553 0.0509374C5.71356 0.0183224 5.67021 -4.01692e-07 5.625 -4.09794e-07L4.34591 -4.65705e-07C4.25318 -4.69758e-07 4.17682 0.0779124 4.17682 0.173912L4.17682 13.3301L0.276822 10.1941C0.251562 10.1742 0.221368 10.1619 0.189626 10.1585C0.157884 10.1551 0.125848 10.1608 0.0971074 10.175C0.0683675 10.1891 0.0440593 10.2112 0.0269084 10.2386C0.00975659 10.2661 0.000440147 10.2979 2.40947e-06 10.3304L2.34056e-06 11.9068C-0.000173138 11.9595 0.0113978 12.0116 0.0338406 12.059C0.0562825 12.1065 0.0890097 12.1482 0.129548 12.1809L4.69227 15.8497C4.79285 15.9304 4.91363 15.9806 5.04083 15.9945C5.16802 16.0084 5.29649 15.9856 5.41156 15.9286C5.52663 15.8715 5.62365 15.7826 5.69154 15.672C5.75942 15.5614 5.79543 15.4335 5.79546 15.303ZM10.8245 15.8261L10.8245 2.6713L14.7232 5.8087C14.7486 5.82874 14.7791 5.8411 14.811 5.84437C14.843 5.84764 14.8753 5.84169 14.9041 5.82719C14.9329 5.8127 14.9572 5.79025 14.9742 5.76238C14.9911 5.73452 15.0001 5.70236 15 5.66957L15 4.09322C15.0002 4.0405 14.9886 3.98844 14.9662 3.94095C14.9437 3.89347 14.911 3.85181 14.8705 3.81913L10.3077 0.15026C10.2072 0.0696705 10.0866 0.0195196 9.95951 0.00552893C9.83244 -0.00846178 9.70407 0.0142711 9.58905 0.0711344C9.47403 0.127998 9.37699 0.216701 9.30901 0.327126C9.24102 0.43755 9.20482 0.565248 9.20455 0.695652L9.20455 15.8261C9.20455 15.8722 9.2225 15.9164 9.25447 15.9491C9.28644 15.9817 9.32979 16 9.375 16L10.6541 16C10.6993 16 10.7427 15.9817 10.7746 15.9491C10.8066 15.9164 10.8245 15.8722 10.8245 15.8261Z" />
    </mask>
    <path
      d="M5.79546 15.303L7.79546 15.3033L7.79546 15.303L5.79546 15.303ZM5.625 -4.09794e-07L5.625 -2L5.625 -4.09794e-07ZM4.17682 0.173912L2.17682 0.173912L2.17682 0.173912L4.17682 0.173912ZM4.17682 13.3301L2.92353 14.8887L6.17682 17.5047L6.17682 13.3301L4.17682 13.3301ZM0.276822 10.1941L1.53011 8.63547L1.52238 8.62926L1.51459 8.62312L0.276822 10.1941ZM2.40947e-06 10.3304L-1.99982 10.3036L-2 10.317L-2 10.3304L2.40947e-06 10.3304ZM2.34056e-06 11.9068L2 11.9134L2 11.9068L2.34056e-06 11.9068ZM0.129548 12.1809L-1.12575 13.7379L-1.12373 13.7395L0.129548 12.1809ZM4.69227 15.8497L3.43899 17.4084L3.44095 17.4099L4.69227 15.8497ZM10.8245 15.8261L12.8245 15.8261L10.8245 15.8261ZM10.8245 2.6713L12.0784 1.11318L8.82454 -1.50536L8.82454 2.6713L10.8245 2.6713ZM14.7232 5.8087L13.4693 7.36682L13.4774 7.37335L13.4856 7.3798L14.7232 5.8087ZM15 5.66957L13 5.66957L13 5.6737L15 5.66957ZM15 4.09322L13 4.08656L13 4.09322L15 4.09322ZM14.8705 3.81913L16.1258 2.26214L16.1237 2.26051L14.8705 3.81913ZM10.3077 0.15026L11.561 -1.40836L11.5591 -1.40993L10.3077 0.15026ZM9.20455 0.695652L7.20455 0.691386L7.20455 0.695652L9.20455 0.695652ZM9.20455 15.8261L7.20455 15.8261L9.20455 15.8261ZM9.375 16L9.375 18L9.375 16ZM7.79546 15.303L7.79546 0.173913L3.79546 0.173912L3.79546 15.303L7.79546 15.303ZM7.79546 0.173913C7.79546 -0.389833 7.57634 -0.938374 7.17388 -1.349L4.31719 1.45088C3.97866 1.10548 3.79546 0.645409 3.79546 0.173912L7.79546 0.173913ZM7.17388 -1.349C6.77007 -1.761 6.21375 -2 5.625 -2L5.625 2C5.12667 2 4.65706 1.79765 4.31719 1.45088L7.17388 -1.349ZM5.625 -2L4.34591 -2L4.34591 2L5.625 2L5.625 -2ZM4.34591 -2C3.10061 -2 2.17682 -0.978034 2.17682 0.173912L6.17682 0.173913C6.17682 1.13386 5.40576 2 4.34591 2L4.34591 -2ZM2.17682 0.173912L2.17682 13.3301L6.17682 13.3301L6.17682 0.173912L2.17682 0.173912ZM5.43011 11.7715L1.53011 8.63547L-0.976464 11.7527L2.92353 14.8887L5.43011 11.7715ZM1.51459 8.62312C1.19575 8.3719 0.81045 8.21324 0.401238 8.1697L-0.0219846 12.1473C-0.367714 12.1105 -0.692624 11.9765 -0.96095 11.765L1.51459 8.62312ZM0.401238 8.1697C-0.008098 8.12615 -0.419804 8.20012 -0.786616 8.3808L0.980831 11.9691C0.6715 12.1215 0.323866 12.184 -0.0219846 12.1473L0.401238 8.1697ZM-0.786616 8.3808C-1.15304 8.56128 -1.45725 8.83947 -1.66941 9.17913L1.72322 11.2981C1.54537 11.5829 1.28977 11.817 0.980831 11.9691L-0.786616 8.3808ZM-1.66941 9.17913C-1.88134 9.51845 -1.9945 9.90773 -1.99982 10.3036L1.99982 10.3573C1.99538 10.688 1.90085 11.0137 1.72322 11.2981L-1.66941 9.17913ZM-2 10.3304L-2 11.9068L2 11.9068L2 10.3304L-2 10.3304ZM-1.99999 11.9001C-2.00115 12.2495 -1.92455 12.5959 -1.77436 12.9137L1.84204 11.2044C1.94735 11.4272 2.0008 11.6695 1.99999 11.9134L-1.99999 11.9001ZM-1.77436 12.9137C-1.62412 13.2316 -1.4033 13.5141 -1.12575 13.7379L1.38485 10.6239C1.58132 10.7823 1.73668 10.9815 1.84204 11.2044L-1.77436 12.9137ZM-1.12373 13.7395L3.43899 17.4084L5.94555 14.2911L1.38283 10.6222L-1.12373 13.7395ZM3.44095 17.4099C3.83591 17.7267 4.31456 17.9269 4.82297 17.9826L5.25869 14.0064C5.5127 14.0342 5.74978 14.1341 5.9436 14.2895L3.44095 17.4099ZM4.82297 17.9826C5.33148 18.0383 5.84363 17.9466 6.29973 17.7205L4.52339 14.1366C4.74936 14.0246 5.00456 13.9786 5.25869 14.0064L4.82297 17.9826ZM6.29973 17.7205C6.75544 17.4947 7.13388 17.1455 7.39618 16.718L3.98689 14.626C4.11342 14.4198 4.29781 14.2484 4.52339 14.1366L6.29973 17.7205ZM7.39618 16.718C7.65827 16.2909 7.79537 15.8008 7.79546 15.3033L3.79546 15.3026C3.7955 15.0662 3.86057 14.8318 3.98689 14.626L7.39618 16.718ZM12.8245 15.8261L12.8245 2.6713L8.82454 2.6713L8.82454 15.8261L12.8245 15.8261ZM9.57066 4.22943L13.4693 7.36682L15.9771 4.25057L12.0784 1.11318L9.57066 4.22943ZM13.4856 7.3798C13.8067 7.63278 14.1953 7.79183 14.6076 7.83399L15.0145 3.85474C15.3629 3.89036 15.6905 4.0247 15.9608 4.23759L13.4856 7.3798ZM14.6076 7.83399C15.0201 7.87617 15.4344 7.79907 15.8023 7.61418L14.006 4.04021C14.3161 3.8843 14.6659 3.8191 15.0145 3.85474L14.6076 7.83399ZM15.8023 7.61418C16.1697 7.42949 16.4733 7.14628 16.6828 6.80183L13.2655 4.72294C13.4411 4.43421 13.6962 4.19591 14.006 4.04021L15.8023 7.61418ZM16.6828 6.80183C16.8922 6.45771 17.0008 6.06412 17 5.66543L13 5.6737C12.9993 5.3406 13.0901 5.01133 13.2655 4.72294L16.6828 6.80183ZM17 5.66957L17 4.09322L13 4.09322L13 5.66957L17 5.66957ZM17 4.09987C17.0011 3.75052 16.9246 3.40408 16.7744 3.08632L13.158 4.79559C13.0527 4.57279 12.9992 4.33048 13 4.08656L17 4.09987ZM16.7744 3.08632C16.6241 2.76842 16.4033 2.4859 16.1257 2.26214L13.6152 5.37612C13.4187 5.21773 13.2633 5.01852 13.158 4.79559L16.7744 3.08632ZM16.1237 2.26051L11.561 -1.40836L9.05445 1.70888L13.6172 5.37775L16.1237 2.26051ZM11.5591 -1.40993C11.1644 -1.72642 10.6863 -1.92654 10.1784 -1.98246L9.74064 1.99352C9.48688 1.96558 9.25005 1.86576 9.0564 1.71045L11.5591 -1.40993ZM10.1784 -1.98246C9.67036 -2.03839 9.15862 -1.94713 8.70269 -1.72173L10.4754 1.864C10.2495 1.97568 9.99452 2.02147 9.74064 1.99352L10.1784 -1.98246ZM8.70269 -1.72173C8.24716 -1.49652 7.86863 -1.14813 7.60592 -0.721441L11.0121 1.37569C10.8854 1.58153 10.7009 1.75252 10.4754 1.864L8.70269 -1.72173ZM7.60592 -0.721441C7.34342 -0.295086 7.20561 0.194361 7.20455 0.691386L11.2045 0.699918C11.204 0.936136 11.1386 1.17019 11.0121 1.37569L7.60592 -0.721441ZM7.20455 0.695652L7.20455 15.8261L11.2045 15.8261L11.2045 0.695652L7.20455 0.695652ZM7.20455 15.8261C7.20455 16.3898 7.42364 16.9384 7.82612 17.349L10.6828 14.5491C11.0214 14.8945 11.2045 15.3546 11.2045 15.8261L7.20455 15.8261ZM7.82612 17.349C8.22992 17.761 8.78624 18 9.375 18L9.375 14C9.87334 14 10.3429 14.2024 10.6828 14.5491L7.82612 17.349ZM9.375 18L10.6541 18L10.6541 14L9.375 14L9.375 18ZM10.6541 18C11.2428 18 11.7992 17.761 12.203 17.349L9.34627 14.5491C9.68614 14.2024 10.1557 14 10.6541 14L10.6541 18ZM12.203 17.349C12.6054 16.9384 12.8245 16.3898 12.8245 15.8261L8.82454 15.8261C8.82454 15.3546 9.00773 14.8945 9.34627 14.5491L12.203 17.349Z"
      fill="#8C7EBD"
      mask="url(#path-1-inside-1_142_586)"
    />
  </svg>
);

const sender = Ethers.send("eth_requestAccounts", [])[0];

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ selectedChainId: chainId });
    })
    .catch(() => {});
}

State.init({
  inputAssetModalHidden: true,
  outputAssetModalHidden: true,
  inputAssetAmount: "1",
  outputAssetAmount: "",
  slippagetolerance: "0.5",
  reloadPools: false,
  hoverOnChain: "",
  estimate: {},
  inputAssetTokenId: "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035",
  outputAssetTokenId: "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9",
  coinGeckoTokenIds: {
    "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035":
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9":
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1":
      "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    "0xa2036f0538221a77a3937f1379699f44945018d0":
      "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
    "0xa2036f0538221a77A3937F1379699f44945018d0":
      "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
    "0x1E4a5963aBFD975d8c9021ce480b42188849D41d":
      "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4":
      "0x6b175474e89094c44da98b954eedeac495271d0f",
  },
  selectedDex: props.dex ?? "Pancake Swap",
  loadRes: (value) => {
    if (value.estimate === "NaN") value.estimate = 0;
    State.update({
      estimate: value,
      outputAssetAmount: value === null ? "" : value.estimate,
    });
  },
  add: false,
  hasGetStorage: false,
  noPool: false,
});

const refReferralId = props.refReferralId ?? "ukraine";

const { source } = props;

const forceNetwork = NETWORK_ZKEVM;

const getEVMAccountId = () => {
  if (ethers !== undefined) {
    return Ethers.send("eth_requestAccounts", [])[0] ?? "";
  }
  return "";
};

if (!state.sender) {
  State.update({
    sender: getEVMAccountId(),
  });
}

const onDexDataLoad = (data) => {
  console.log("dexdata: ", data);
  State.update({
    ...data,
    forceReload: false,
    sender: getEVMAccountId(),
    outputAssetAmount: "",
  });
};

const Theme = styled.div`
  font-size: 18px;
`;

const currentAccountId =
  getEVMAccountId() !== "" ? getEVMAccountId() : context.accountId;

const rearrangeAssets = () => {
  console.log("state: ", state);

  State.update({
    inputAssetTokenId: state.outputAssetTokenId,
    outputAssetTokenId: state.inputAssetTokenId,
    inputAssetAmount: "1",
    approvalNeeded: undefined,
  });
};

const changeAmount = (e) => {
  const targetValue = e.target.value;
  if (targetValue !== "" && !targetValue.match(/^(0|([1-9]\d*))(\.\d*)?$/)) {
    return;
  }
  let amount = targetValue.replace(/^0+/, "0"); // remove prefix 0

  State.update({ inputAssetAmount: amount });
};

// REUSABLE UI ELEMEETS

console.log("output amount", state.outputAssetAmount);

const assetContainer = (
  isInputAsset,
  assetData,
  amountName,
  assetNameOnClick
) => {
  const useSpacer = !!isInputAsset;

  const assetContainerClass = useSpacer
    ? "asset-container-top"
    : "asset-container-bottom";

  return (
    <>
      <div
        class={`${assetContainerClass} asset-container`}
        style={{ border: 0 }}
      >
        <div class="swap-currency-input">
          <div className="swap-direction">
            {amountName === "inputAssetAmount" ? "Swap From" : "To"}
          </div>
          <div class="swap-currency-input-top">
            <Input
              type="text"
              placeholder="0"
              value={state[amountName]}
              readOnly={amountName === "outputAssetAmount"}
              onChange={changeAmount}
            />
            <Seperator></Seperator>
            <div class="input-asset-token" onClick={assetNameOnClick}>
              <div class="input-asset-token-name">
                <div class="input-asset-token-icon">
                  {assetData?.metadata.icon ? (
                    <img
                      alt={`${assetData.metadata.name} logo`}
                      src={assetData.metadata.icon}
                      class="input-asset-token-icon-img"
                      style={{
                        width: "32px",
                      }}
                    />
                  ) : (
                    <div
                      className=""
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "100%",
                      }}
                    ></div>
                  )}
                </div>
                <span class="input-asset-token-ticker">
                  {assetData.metadata.symbol}
                </span>
                <ArrowDownWrapper>{arrowDown}</ArrowDownWrapper>
              </div>
            </div>
          </div>
          <div class="input-asset-details-row">
            <div class="input-asset-details-price-container">
              <div class="input-asset-details-price">
                <div>≈${assetData.price}</div>
              </div>
            </div>
            <div class="input-asset-details-balance-container">
              <div class="input-asset-details-balance-text">
                Balance:
                <button
                  className="input-asset-details-balance-text-number"
                  disabled={new Big(assetData.balance_hr_full ?? 0).eq(0)}
                  onClick={() => {
                    if (new Big(assetData.balance_hr_full ?? 0).eq(0)) {
                      return;
                    }

                    State.update({
                      [amountName]: assetData.balance_hr_full ?? 0,
                    });
                  }}
                >
                  {assetData.balance_hr_full}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// SWAP METHODS

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};

const tokenInApprovaleNeededCheck = () => {
  if (state.approvalNeeded === undefined) {
    if (
      getEVMAccountId() &&
      state.erc20Abi !== undefined &&
      state.routerContract !== undefined &&
      [NETWORK_ZKSYNC, NETWORK_ZKEVM, NETWORK_POLYGON].includes(state.network)
    ) {
      const ifaceErc20 = new ethers.utils.Interface(state.erc20Abi);

      const encodedTokenAllowancesData = ifaceErc20.encodeFunctionData(
        "allowance",
        [getEVMAccountId(), state.routerContract]
      );

      return Ethers.provider()
        .call({
          to: state.inputAssetTokenId,
          data: encodedTokenAllowancesData,
        })
        .then((encodedTokenAllowanceHex) => {
          const tokenAllowance = ifaceErc20.decodeFunctionResult(
            "allowance",
            encodedTokenAllowanceHex
          );

          if (tokenAllowance) {
            State.update({
              approvalNeeded: new Big(tokenAllowance).toFixed() == "0",
            });
          }
        })
        .catch(() => {});
    } else {
      State.update({ approvalNeeded: false });
    }
  }
};

if ([NETWORK_ZKSYNC, NETWORK_ZKEVM, NETWORK_POLYGON].includes(state.network)) {
  tokenInApprovaleNeededCheck();
}

const canSwap =
  state.network &&
  Number(state.inputAsset.balance_hr_full) >= Number(state.inputAssetAmount) &&
  Number(state.inputAssetAmount || 0) > 0 &&
  state.inputAssetTokenId !== state.outputAssetTokenId;

const insufficientBalance =
  Number(state.inputAsset.balance_hr_full) < Number(state.inputAssetAmount) &&
  state.inputAssetTokenId !== state.outputAssetTokenId &&
  state.network &&
  Number(state.inputAssetAmount || 0) > 0;

const ExchangeWrapper = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
      }}
    >
      <div
        style={{
          cursor: "pointer",
        }}
        onClick={rearrangeAssets}
      >
        {exchangeIcon}
      </div>
    </div>
  );
};

const SwapMainContainer = styled.div`
  display: flex;
  align-items: start;
  gap: 8px;
  font-size: 18px;
  position: fixed;
  left: 50%;
  /* top: 50%; */
  transform: translate(-50%);

  .invalid-pool-tip {
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: center;
    color: #ff61d3;
    padding-bottom: 5px;
  }
`;

const NetworkList = styled.div`
  border-radius: 16px;
  padding: 16px;
  z-index: 10;
  font-size: 18px;
  width: 251px;
  height: 451px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: linear-gradient(0deg, #181a27, #181a27),
    linear-gradient(0deg, #332c4b, #332c4b);
  border: 1px solid #332c4b;
  overflow: hidden;
`;

const NetWorkItem = styled.li`
  display: flex;
  align-items: start;
  padding: 8px;
  gap: 12px;
  width: 100%;
  border-radius: 12px;
  opacity: 0.5;
  cursor: pointer;
  img {
    padding-top: 4px;
  }
  .network-name {
    font-size: 16px;
    color: #979abe;
  }
  .network-dex {
    font-size: 18px;
    color: white;
    font-weight: bold;
  }

  &:hover {
    background: #794fdd;
    opacity: 1;
    .network-name {
      color: white;
    }
  }
`;

const Seperator = styled.div`
  border: 1px solid #332c4b;
  height: 1px;
  width: 327px;
  position: absolute;
  bottom: 0px;
`;

const SwapPage = styled.div`
  width: 560px;

  .swap-button {
    font-size: bold;
    cursor: pointer;
    width: 100%;
    height: 100%;
    padding: 16px;
  }

  .swap-button-text {
    font-size: bold;
  }

  .swap-button-enabled {
    width: 100%;
    height: 100%;
    padding: 16px;

    :disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  button {
    border: none;
    background: none;
  }

  min-height: 451px;
  padding: 28px;
  background: linear-gradient(0deg, #181a27, #181a27),
    linear-gradient(0deg, #332c4b, #332c4b);
  border-radius: 16px;
  border: 1px solid #332c4b;

  .swap-direction {
    color: #8c7ebd;
  }

  .swap-currency-input {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .swap-currency-input-top {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .input-asset-token-name {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    cursor: pointer;
    color: white;
    border: 1px solid #332c4b;
    background: linear-gradient(0deg, #222436, #222436),
      linear-gradient(0deg, #332c4b, #332c4b);
    padding: 8px;
    width: 159px;
    border-radius: 23px;
  }
  .input-asset-details-row {
    display: flex;
    align-items: center;

    justify-content: space-between;
    color: #4f5375;
    font-size: 14px;
  }

  .input-asset-details-balance-text-number {
    text-decoration: underline;
    cursor: pointer;
    color: #4f5375;
    :disabled {
      cursor: not-allowed;
      color: #4f5375;
    }
  }

  .swap-button-container {
    width: 100%;
    border-radius: 10px;
    text-align: center;
    color: white;
    background: #794fdd;
  }

  .swap-price-details-rate {
    color: #4f5375;
    font-size: 14px;
    text-align: right;
    padding: 20px 0px 24px 0px;
  }

  .swap-button-text {
    color: white;
  }
`;

const Input = styled.input`
  background: none;
  color: #fff;
  text-align: left;
  border: none;
  outline: none;
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 19px;
  padding: 8px 0px 8px 8px;
  width: 100%;
  ::placeholder {
    color: #40435c;
  }
`;

const selectedChainId = state.selectedChainId ?? 0;
const selectedDex = state.selectedDex;

const switchNetwork = (chainId, dex) => {
  Ethers.send("wallet_switchEthereumChain", [
    { chainId: `0x${chainId.toString(16)}` },
  ]);

  State.update({
    selectedDex: dex,
    forceReload: true,
  });
};

const networkList = NETWORKS.map((network) => network.chainId); //  [1, 1101];

const getNetworkKey = (chainId, dex) => `${chainId ?? 0}_${dex ?? ""}`;

const networks = {};
NETWORKS.map(
  (network) =>
    (networks[getNetworkKey(network.chainId, network.dex)] = {
      chainId: network.chainId,
      name: network.name,
      icon: <img style={{ width: "30px" }} src={network.icon} />,
      dex: network.dex,
    })
);

const assetsList = state.assets
  ? state.assets.map((tokenId) => (
      <Widget
        src="zavodil.near/widget/TokenBalance"
        props={{
          tokenId: tokenId,
          coinGeckoTokenId: state.coinGeckoTokenIds[tokenId],
          network: state.network,
          hideZeroBalance: true,
          fractionDigits: 4,
        }}
      ></Widget>
    ))
  : "";

const getFromNetworkLabel = () => {
  if (!selectedDex && selectedChainId) {
    console.log("selectedDex is missing");
    let chainKeyDataArray = Object.keys(networks).filter(
      (chainKey) => networks[chainKey].chainId == selectedChainId
    );
    console.log("chainKeyDataArray", chainKeyDataArray);
    if (chainKeyDataArray.length) {
      selectedDex = networks[chainKeyDataArray[0]].dex;
    }
  }
  let network = networks[getNetworkKey(selectedChainId, selectedDex)];
  return network.icon ? (
    <>
      <img style={{ width: "30px" }} src={network.icon} />
      <span>
        {network.name} {network.dex}
      </span>
    </>
  ) : (
    <>
      <div
        style={{
          height: "30px",
          width: "30px",
          borderRadius: "100%",
        }}
      ></div>{" "}
      Undefined
    </>
  );
};

const networksDropDown = Object.keys(networks).map((chainKey) => {
  let network = networks[chainKey];

  const light = selectedDex === network.dex;

  return (
    <NetWorkItem
      onClick={() => {
        switchNetwork(Number(network.chainId), network.dex ?? "");
        State.update({
          noPool: false,
        });
      }}
      onMouseEnter={() => {
        State.update({
          hoverOnChain: chainKey,
        });
      }}
      onMouseLeave={() => {
        State.update({
          hoverOnChain: "",
        });
      }}
      key={chainKey}
      style={{
        background: light ? "#794fdd" : "",
        opacity: light ? 1 : "",
      }}
    >
      {network.icon}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <div
          className="network-name"
          style={{
            color: light ? "white" : "",
          }}
        >
          Polygon zkEVM
        </div>

        <div className="network-dex">{network.dex}</div>
      </div>
    </NetWorkItem>
  );
});

if (forceNetwork && state.network && forceNetwork !== state.network) {
  return (
    <Theme>
      <SwapMainContainer class="">
        To proceed, kindly switch to zkEVM.
        <Widget
          src="guessme.near/widget/ZKEVMSwap.zkevm-connect"
          props={{
            title: "Polygon zkEVM Swap",
            src: "https://assets.ref.finance/images/zkevm-swap.png",
            imgStyle: {
              width: "528px",
              height: "216px",
            },
          }}
        />
      </SwapMainContainer>
    </Theme>
  );
}

let params = Storage.get(
  "zk-evm-swap-params",
  "guessme.near/widget/ZKEVMWarmUp.quest-card"
);
const params_from_question_list = Storage.get(
  "zk-evm-swap-params",
  "guessme.near/widget/ZKEVM.QuestionList"
);

if (props.source == "question_list" && params_from_question_list) {
  params = params_from_question_list;
}

if (params && selectedChainId === 1101 && state.hasGetStorage === false) {
  if (!!params?.amount && !!params?.assetId) {
    State.update({
      storeParams: params,
      inputAssetAmount: params.amount,
      approvalNeeded: undefined,
      inputAssetTokenId: params.assetId,
      outputAssetTokenId:
        params.assetId === state.outputAssetTokenId
          ? state.inputAssetTokenId
          : state.outputAssetTokenId,
    });
  }

  if (!!params?.dexName) {
    switchNetwork(1101, params.dexName);
  }

  State.update({
    hasGetStorage: true,
  });
}

function add_action(param_body) {
  asyncFetch("https://bos-api.delink.one/add-action-data", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param_body),
  });
}

const onCallTxComple = (tx) => {
  console.log("transactionHash", tx);

  const uuid = Storage.get(
    "zkevm-warm-up-uuid",
    "guessme.near/widget/ZKEVMWarmUp.generage-uuid"
  );

  if (!state.add) return;

  tx.wait().then((receipt) => {
    const { status, transactionHash } = receipt;

    add_action({
      action_title: `Swap ${state.inputAssetAmount} ${state.inputAsset.metadata.symbol} on ${selectedDex}`,
      action_type: "Swap",
      action_tokens: JSON.stringify([
        `${state.inputAsset.metadata.symbol}`,
        `${state.outputAsset.metadata.symbol}`,
      ]),
      action_amount: state.inputAssetAmount,
      account_id: state.sender,
      account_info: uuid,
      template: selectedDex,
      action_status: status === 1 ? "Success" : "Failed",
      tx_id: transactionHash,
    });

    State.update({
      outputAsset: undefined,
    });
  });
};

if (!state.sender || selectedChainId !== 1101) {
  const title = !state.sender
    ? "Polygon zkEVM Swap"
    : ` To proceed, kindly switch to zkEVM.`;

  if (!!state.sender && selectedChainId !== 1101) {
    switchNetwork(1101, "Pancake Swap");
  }

  return (
    <Widget
      src="guessme.near/widget/ZKEVMSwap.zkevm-connect"
      props={{
        title,
        src: "https://assets.ref.finance/images/zkevm-swap.png",
        imgStyle: {
          width: "528px",
          height: "216px",
        },
      }}
    />
  );
}

return (
  <Theme>
    <Widget
      src="guessme.near/widget/ZKEVMSwap.zkevm-dexData"
      props={{
        onLoad: onDexDataLoad,
        NETWORK_ZKSYNC,
        NETWORK_ZKEVM,
        NETWORK_POLYGON,
        forceReload: state.forceReload ?? false,
        DEX: selectedDex,
        sender,
        onShowNoPool: () => State.update({ noPool: true }),
      }}
    />

    {state.network && state.inputAssetTokenId && (
      <Widget
        src="guessme.near/widget/ZKEVMSwap.zkevm-asset-list"
        props={{
          network: state.network,
          assets: state.assets,
          hidden: state.inputAssetModalHidden,
          coinGeckoTokenIds: state.coinGeckoTokenIds,
          selectedAssets: [state.inputAssetTokenId],
          onClick: (tokenId) => {
            State.update({
              inputAssetModalHidden: true,
              inputAssetTokenId: tokenId,
              approvalNeeded: undefined,
              noPool: false,
            });
          },
          onClose: () => State.update({ inputAssetModalHidden: true }),
        }}
      />
    )}
    {state.network && state.outputAssetTokenId && (
      <Widget
        src="guessme.near/widget/ZKEVMSwap.zkevm-asset-list"
        props={{
          assets: state.assets,
          coinGeckoTokenIds: state.coinGeckoTokenIds,
          network: state.network,
          hidden: state.outputAssetModalHidden,
          selectedAssets: [state.outputAssetTokenId],
          onClick: (tokenId) => {
            State.update({
              outputAssetModalHidden: true,
              outputAssetTokenId: tokenId,
              outputAsset: null,
              noPool: false,
            });
          },
          onClose: () => State.update({ outputAssetModalHidden: true }),
        }}
      />
    )}
    <Widget
      src="guessme.near/widget/ZKEVMSwap.zkevm-token-data"
      props={{
        tokenId: state.inputAssetTokenId,
        coinGeckoTokenId: state?.coinGeckoTokenIds?.[state.inputAssetTokenId],
        network: state.network,
        NETWORK_ZKEVM,
        onLoad: (inputAsset) => {
          console.log("TokenData onLoad inputAsset", inputAsset);
          inputAsset.metadata.symbol = inputAsset.metadata.symbol.toUpperCase();
          State.update({ inputAsset });
        },
      }}
    />
    <Widget
      src="guessme.near/widget/ZKEVMSwap.zkevm-token-data"
      props={{
        tokenId: state.outputAssetTokenId,
        coinGeckoTokenId: state?.coinGeckoTokenIds?.[state.outputAssetTokenId],
        network: state.network,
        NETWORK_ZKSYNC,
        NETWORK_ZKEVM,
        NETWORK_POLYGON,
        onLoad: (outputAsset) => {
          console.log("TokenData onLoad outputAsset", outputAsset);
          outputAsset.metadata.symbol =
            outputAsset.metadata.symbol.toUpperCase();
          State.update({ outputAsset });
        },
      }}
    />

    {state.network === NETWORK_ZKEVM &&
      state.inputAssetTokenId &&
      state.outputAssetTokenId &&
      state.inputAssetTokenId !== state.outputAssetTokenId &&
      state.inputAsset &&
      state.inputAsset.metadata?.decimals &&
      state.outputAsset &&
      state.outputAsset.metadata?.decimals &&
      parseFloat(state.inputAssetAmount) > 0 && (
        <Widget
          src="guessme.near/widget/ZKEVMSwap.quickswap-v3-getEstimate"
          props={{
            loadRes: state.loadRes,
            tokenIn: state.inputAssetTokenId,
            tokenOut: state.outputAssetTokenId,
            tokenOutDecimals: state.outputAsset.metadata.decimals,
            amountIn: expandToken(
              state.inputAssetAmount,
              state.inputAsset.metadata.decimals
            ).toFixed(0),
            reloadPools: state.reloadPools,
            dex: state.selectedDex,
            setReloadPools: (value) =>
              State.update({
                reloadPools: value,
              }),
          }}
        />
      )}

    <SwapMainContainer>
      {state.network && state.dexName && (
        <div>
          <div
            style={{
              color: "#794FDD",
              paddingLeft: "12px",
              fontWeight: 500,
            }}
          >
            Chain & Dapp
          </div>
          <NetworkList>{networksDropDown}</NetworkList>
        </div>
      )}

      <div>
        <div
          style={{
            color: "#794FDD",
            paddingLeft: "12px",
            fontWeight: 500,
          }}
        >
          {/* Swap */}
          {selectedDex}
        </div>

        <SwapPage>
          <div class="top-container">
            {assetContainer(true, state.inputAsset, "inputAssetAmount", () => {
              State.update({ inputAssetModalHidden: false });
            })}
          </div>

          <ExchangeWrapper></ExchangeWrapper>
          <div class="bottom-container">
            {assetContainer(
              fasle,
              state.outputAsset,
              "outputAssetAmount",
              () => {
                State.update({ outputAssetModalHidden: false });
              }
            )}
            <div class="swap-price-container">
              <div class="swap-price-details-rate">
                {state.inputAssetTokenId === state.outputAssetTokenId
                  ? "-"
                  : `1 ${state.inputAsset.metadata.symbol} ≈ ${
                      new Big(state.inputAssetAmount || 0).eq(0) ||
                      new Big(state.outputAssetAmount || 0).eq(0)
                        ? "-"
                        : new Big(state.outputAssetAmount || 0)
                            .div(state.inputAssetAmount || 1)
                            .toFixed(4, 0)
                    } ${state.outputAsset.metadata.symbol}`}
              </div>
            </div>
            {state.noPool && state.inputAsset && state.outputAsset && (
              <div className="invalid-pool-tip">
                {`No pool available to make a swap from ${state.inputAsset.metadata.symbol}-> ${state.outputAsset.metadata.symbol} for the amount ${state.inputAssetAmount}`}
              </div>
            )}

            <div
              class="swap-button-container"
              notEnough={insufficientBalance && !state.approvalNeeded}
              style={{
                background:
                  insufficientBalance && !state.approvalNeeded
                    ? "#FF61D3"
                    : "#794fdd",
                opacity: insufficientBalance && !state.approvalNeeded ? 0.5 : 1,
              }}
            >
              {state.approvalNeeded && (
                <button
                  class={"swap-button"}
                  onClick={() => {
                    state.callTokenApproval(
                      state,
                      () => {
                        State.update({
                          outputAsset: undefined,
                        });
                        tokenInApprovaleNeededCheck();
                      },
                      undefined /* "120"*/,
                      undefined /* 100000 */
                    );
                  }}
                >
                  <div class="swap-button-text">
                    Approve {state.inputAsset.metadata.symbol}
                  </div>
                </button>
              )}
              {!state.approvalNeeded && (
                <button
                  class={"swap-button-enabled"}
                  disabled={!canSwap}
                  onClick={() => {
                    if (canSwap) {
                      try {
                        state.callTx(
                          state,
                          onCallTxComple,
                          "2.09",
                          3000000,
                          "0",
                          state.estimate.path
                        );
                      } catch (error) {}
                    }
                  }}
                >
                  <div class="swap-button-text">
                    {insufficientBalance ? "insufficient Balance" : "Swap"}
                  </div>
                </button>
              )}
            </div>
          </div>
        </SwapPage>

        <Widget
          src="guessme.near/widget/ZKEVMWarmUp.add-to-quest-card"
          props={{
            ...props,
            add: state.add,
            onChangeAdd: (value) => {
              State.update({
                add: value,
              });
            },
            hide:
              !state?.outputAsset ||
              !state?.inputAssetAmount ||
              !state?.inputAsset ||
              !state?.selectedDex ||
              (source === "quest-card" &&
                state.storeParams &&
                state.storeParams.amount === state.inputAssetAmount &&
                state.storeParams.assetId.toLowerCase() ===
                  state.inputAssetTokenId.toLowerCase() &&
                state.storeParams.dexName === state.selectedDex &&
                state.storeParams.symbol ===
                  state?.inputAsset?.metadata?.symbol),
          }}
        />
      </div>
    </SwapMainContainer>
  </Theme>
);
