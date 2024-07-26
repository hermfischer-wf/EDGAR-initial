/* Created by staff of the U.S. Securities and Exchange Commission.
 * Data and content created by government employees within the scope of their employment 
 * are not subject to domestic copyright protection. 17 U.S.C. 105.
 */

'use strict';

var FiltersOther = {
  
  getLanguage : function( lang ) {
    if ( lang && typeof lang === 'string' ) {
      return lang.toUpperCase();
    }
    return null;
  },
  
  getFootnote : function( footnoteID ) {
    if ( footnoteID && typeof footnoteID === 'string' ) {
      var foundRelations = document.getElementById('dynamic-xbrl-form').querySelectorAll(
          '[fromrefs*="' + footnoteID + '"]');
      var foundRelationsArray = Array.prototype.slice.call(foundRelations);
      
      var idsToGet = foundRelationsArray.map(function( current ) {
        if ( current.hasAttribute('torefs') ) {
          return current.getAttribute('torefs');
        }
      }).filter(function( element ) {
        return element;
      });
      
      var contentToReturn = '';
      idsToGet.forEach(function( current ) {
        var discoveredFootnote = document.getElementById('dynamic-xbrl-form').querySelector(
            '[data-original-id="' + current + '"],[id="' + current + '"]');
        
        if ( discoveredFootnote ) {
          contentToReturn += discoveredFootnote.innerHTML;
        }
      });
      return contentToReturn;
    }
    return null;
  },
  
  countryNameEn : function( element ) {
    if ( element && typeof element === 'object' && element['innerText'] ) {
      
      var regexOptions = {
        
        'AF' : /^\s*([Aa]fghanistan)\s*$/,
        'AX' : /^\s*([\u00c5\u00e5Aa]land\s+[Ii]slands)\s*$/,
        'AL' : /^\s*([Aa]lbania)\s*$/,
        'DZ' : /^\s*([Aa]lgeria)\s*$/,
        'AS' : /^\s*([Aa]merican\s+[Ss]amoa)\s*$/,
        'AD' : /^\s*([Aa]ndorra)\s*$/,
        'AO' : /^\s*([Aa]ngola)\s*$/,
        'AI' : /^\s*([Aa]nguilla)\s*$/,
        'AQ' : /^\s*([Aa]ntarctica)\s*$/,
        'AG' : /^\s*([Aa]ntigua\s+[Aa]nd\s+[Bb]arbuda)\s*$/,
        'AR' : /^\s*((([Tt]he\s+)?[Rr]epublic\s+[Oo]f\s+)?[Aa]rgentina)\s*$/,
        'AM' : /^\s*([Aa]rmenia)\s*$/,
        'AW' : /^\s*([Aa]ruba)\s*$/,
        'AU' : /^\s*([Aa]ustralia)\s*$/,
        'AT' : /^\s*([Aa]ustria)\s*$/,
        'AZ' : /^\s*([Aa]zerbaijan)\s*$/,
        'BS' : /^\s*([Bb]ahamas)\s*$/,
        'BH' : /^\s*([Bb]ahrain)\s*$/,
        'BD' : /^\s*([Bb]angladesh)\s*$/,
        'BB' : /^\s*([Bb]arbados)\s*$/,
        'BY' : /^\s*([Bb]elarus)\s*$/,
        'BE' : /^\s*([Bb]elgium)\s*$/,
        'BZ' : /^\s*([Bb]elize)\s*$/,
        'BJ' : /^\s*([Bb]enin)\s*$/,
        'BM' : /^\s*([Bb]ermuda)\s*$/,
        'BT' : /^\s*([Bb]hutan)\s*$/,
        'BO' : /^\s*([Bb]olivia)\s*$/,
        'BQ' : /^\s*([Bb]onaire[,]?\s+[Ss]int\s+[Ee]ustatius\s+[Aa]nd\s+[Ss]aba)\s*$/,
        'BA' : /^\s*([Bb]osnia\s+[Aa]nd\s+[Hh]erzegovina)\s*$/,
        'BW' : /^\s*([Bb]otswana)\s*$/,
        'BV' : /^\s*([Bb]ouvet\s+[Ii]sland)\s*$/,
        'BR' : /^\s*((([Tt]he\s+)?[Ff]ederative\s+[Rr]epublic\s+[Oo]f\s+)?[Bb]ra[sz]il)\s*$/,
        'IO' : /^\s*([Bb]ritish\s+[Ii]ndian\s+[Oo]cean\s+[Tt]erritory)\s*$/,
        'BN' : /^\s*([Bb]runei\s+[Dd]arussalam)\s*$/,
        'BG' : /^\s*([Bb]ulgaria)\s*$/,
        'BF' : /^\s*([Bb]urkina\s+[Ff]aso)\s*$/,
        'BI' : /^\s*([Bb]urundi)\s*$/,
        'CV' : /^\s*([Cc]a(bo|pe)\s+[Vv]erde)\s*$/,
        'KH' : /^\s*([Cc]ambodia)\s*$/,
        'CM' : /^\s*([Cc]ameroon)\s*$/,
        'CA' : /^\s*([Cc]anada)\s*$/,
        'KY' : /^\s*([Cc]ayman\s+[Ii]slands)\s*$/,
        'CF' : /^\s*([Cc]entral\s+[Aa]frican\s+[Rr]epublic)\s*$/,
        'TD' : /^\s*([Cc]had)\s*$/,
        'CL' : /^\s*([Cc]hile)\s*$/,
        'CN' : /^\s*((([Tt]he\s+)?[Pp]eople['\u2019]?s\s+[Rr]epublic\s+[Oo]f\s+)?[Cc]hina)\s*$/,
        'CX' : /^\s*([Cc]hristmas\s+[Ii]sland)\s*$/,
        'CC' : /^\s*([Cc]ocos\s+(.[Kk]eeling.\s+)?[Ii]slands)\s*$/,
        'CO' : /^\s*((([Tt]he\s+)?[Rr]epublic\s+[Oo]f\s+)?[Cc]olombia)\s*$/,
        'KM' : /^\s*([Cc]omoros)\s*$/,
        'CD' : /^\s*([Dd]emocratic\s+[Rr]epublic\s+[Oo]f\s+([Tt]he\s+)?[Cc]ongo)\s*$/,
        'CG' : /^\s*([Cc]ongo)\s*$/,
        'CK' : /^\s*([Cc]ook\s+[Ii]slands)\s*$/,
        'CR' : /^\s*([Cc]osta\s+[Rr]ica)\s*$/,
        'CI' : /^\s*([Cc][\u00f4o]te\s+d['\u2019][Ii]voire)\s*$/,
        'HR' : /^\s*([Cc]roatia)\s*$/,
        'CU' : /^\s*([Cc]uba)\s*$/,
        'CW' : /^\s*([Cc]ura[c\u00e7]ao)\s*$/,
        'CY' : /^\s*([Cc]yprus)\s*$/,
        'CZ' : /^\s*([Cc]zechia|[Cc]zech\s+[Rr]epublic)\s*$/,
        'DK' : /^\s*((([Tt]he\s+)?[Kk]ingdom\s+[Oo]f\s+)?[Dd]enmark)\s*$/,
        'DJ' : /^\s*([Dd]jibouti)\s*$/,
        'DM' : /^\s*([Dd]ominica)\s*$/,
        'DO' : /^\s*([Dd]ominican\s+[Rr]epublic)\s*$/,
        'EC' : /^\s*([Ee]cuador)\s*$/,
        'EG' : /^\s*([Ee]gypt)\s*$/,
        'SV' : /^\s*([Ee]l\s+[Ss]alvador)\s*$/,
        'GQ' : /^\s*([Ee]quatorial\s+[Gg]uinea)\s*$/,
        'ER' : /^\s*([Ee]ritrea)\s*$/,
        'EE' : /^\s*([Ee]stonia)\s*$/,
        'SZ' : /^\s*([Ee]swatini)\s*$/,
        'ET' : /^\s*([Ee]thiopia)\s*$/,
        'FK' : /^\s*(([Tt]he\s+)?[Ff]alkland\s+[Ii]slands(\s+.[Mm]alvinas.)?|([Ii]slas\s+)?[Mm]alvinas(\s+[Ii]slands)?)\s*$/,
        'FO' : /^\s*([Ff]aroe\s+[Ii]slands)\s*$/,
        'FJ' : /^\s*([Ff]iji)\s*$/,
        'FI' : /^\s*([Ff]inland)\s*$/,
        'FR' : /^\s*([Ff]rance)\s*$/,
        'GF' : /^\s*([Ff]rench\s+[Gg]uiana)\s*$/,
        'PF' : /^\s*([Ff]rench\s+[Pp]olynesia)\s*$/,
        'TF' : /^\s*([Ff]rench\s+[Ss]outhern\s+[Tt]erritories)\s*$/,
        'GA' : /^\s*([Gg]abon)\s*$/,
        'GM' : /^\s*([Gg]ambia)\s*$/,
        'GE' : /^\s*([Gg]eorgia)\s*$/,
        'DE' : /^\s*([Gg]ermany)\s*$/,
        'GH' : /^\s*([Gg]hana)\s*$/,
        'GI' : /^\s*([Gg]ibraltar)\s*$/,
        'GR' : /^\s*([Gg]reece)\s*$/,
        'GL' : /^\s*([Gg]reenland)\s*$/,
        'GD' : /^\s*([Gg]renada)\s*$/,
        'GP' : /^\s*([Gg]uadeloupe)\s*$/,
        'GU' : /^\s*([Gg]uam)\s*$/,
        'GT' : /^\s*([Gg]uatemala)\s*$/,
        'GG' : /^\s*([Gg]uernsey)\s*$/,
        'GN' : /^\s*([Gg]uinea)\s*$/,
        'GW' : /^\s*([Gg]uinea-[Bb]issau)\s*$/,
        'GY' : /^\s*([Gg]uyana)\s*$/,
        'HT' : /^\s*([Hh]aiti)\s*$/,
        'HM' : /^\s*([Hh]eard\s+[Ii]sland\s+[Aa]nd\s+[Mm]cDonald\s+[Ii]slands)\s*$/,
        'VA' : /^\s*(([Tt]he\s+)?[Hh]oly\s+[Ss]ee|[Vv]atican\s+[Cc]ity)\s*$/,
        'HN' : /^\s*([Hh]onduras)\s*$/,
        'HK' : /^\s*([Hh]ong\s+[Kk]ong)\s*$/,
        'HU' : /^\s*([Hh]ungary)\s*$/,
        'IS' : /^\s*([Ii]celand)\s*$/,
        'IN' : /^\s*([Ii]ndia)\s*$/,
        'ID' : /^\s*([Ii]ndonesia)\s*$/,
        'IR' : /^\s*((([Tt]he\s+)?[Ii]slamic\s+[Rr]epublic\s+of\s+)?[Ii]ran)\s*$/,
        'IQ' : /^\s*([Ii]raq)\s*$/,
        'IE' : /^\s*([Ii]reland)\s*$/,
        'IM' : /^\s*([Ii]sle\s+[Oo]f\s+[Mm]an)\s*$/,
        'IL' : /^\s*([Ii]srael)\s*$/,
        'IT' : /^\s*([Ii]taly)\s*$/,
        'JM' : /^\s*([Jj]amaica)\s*$/,
        'JP' : /^\s*([Jj]apan)\s*$/,
        'JE' : /^\s*([Jj]ersey)\s*$/,
        'JO' : /^\s*([Jj]ordan)\s*$/,
        'KZ' : /^\s*([Kk]azakhstan)\s*$/,
        'KE' : /^\s*([Kk]enya)\s*$/,
        'KI' : /^\s*([Kk]iribati)\s*$/,
        'KP' : /^\s*(([Nn]orth|[Dd]emocratic\s+[Pp]eople['\u2019]?s\s+[Rr]epublic\s+[Oo]f)\s+[Kk]orea)\s*$/,
        'KR' : /^\s*(([Ss]outh|[Rr]epublic\s+[Oo]f)\s+[Kk]orea)\s*$/,
        'KW' : /^\s*([Kk]uwait)\s*$/,
        'KG' : /^\s*([Kk]yrgyzstan)\s*$/,
        'LA' : /^\s*([Ll]ao\s+[Pp]eople['\u2019]?s\s+[Dd]emocratic\s+[Rr]epublic)\s*$/,
        'LV' : /^\s*([Ll]atvia)\s*$/,
        'LB' : /^\s*([Ll]ebanon)\s*$/,
        'LS' : /^\s*([Ll]esotho)\s*$/,
        'LR' : /^\s*([Ll]iberia)\s*$/,
        'LY' : /^\s*((([Tt]he\s+)?[Ss]tate\s+[Oo]f\s+)?[Ll]ibya)\s*$/,
        'LI' : /^\s*([Ll]iechtenstein)\s*$/,
        'LT' : /^\s*([Ll]ithuania)\s*$/,
        'LU' : /^\s*((([Tt]he\s+)?([Gg]rand\s+)?[Dd]uchy\s+[Oo]f\s+)?[Ll]uxembourg)\s*$/,
        'MO' : /^\s*([Mm]aca[ou])\s*$/,
        'MG' : /^\s*([Mm]adagascar)\s*$/,
        'MW' : /^\s*([Mm]alawi)\s*$/,
        'MY' : /^\s*([Mm]alaysia)\s*$/,
        'MV' : /^\s*([Mm]aldives)\s*$/,
        'ML' : /^\s*([Mm]ali)\s*$/,
        'MT' : /^\s*([Mm]alta)\s*$/,
        'MH' : /^\s*((([Tt]he\s+)?[Rr]epublic\s+[Oo]f\s+([Tt]he\s+)?)?[Mm]arshall\s+[Ii]slands)\s*$/,
        'MQ' : /^\s*([Mm]artinique)\s*$/,
        'MR' : /^\s*([Mm]auritania)\s*$/,
        'MU' : /^\s*([Mm]auritius)\s*$/,
        'YT' : /^\s*([Mm]ayotte)\s*$/,
        'MX' : /^\s*([Mm]exico|[Uu]nited\s+[Mm]exican\s+[Ss]tates)\s*$/,
        'FM' : /^\s*((([Tt]he\s+)?[Ff]ederated\s+[Ss]tates\s+[Oo]f\s+)?[Mm]icronesia)\s*$/,
        'MD' : /^\s*((([Tt]he\s+)?[Rr]epublic\s+[Oo]f\s+)?[Mm]oldova)\s*$/,
        'MC' : /^\s*([Mm]onaco)\s*$/,
        'MN' : /^\s*([Mm]ongolia)\s*$/,
        'ME' : /^\s*([Mm]ontenegro)\s*$/,
        'MS' : /^\s*([Mm]ontserrat)\s*$/,
        'MA' : /^\s*([Mm]orocco)\s*$/,
        'MZ' : /^\s*([Mm]ozambique)\s*$/,
        'MM' : /^\s*([Mm]yanmar)\s*$/,
        'NA' : /^\s*([Nn]amibia)\s*$/,
        'NR' : /^\s*([Nn]auru)\s*$/,
        'NP' : /^\s*([Nn]epal)\s*$/,
        'NL' : /^\s*([Nn]etherlands)\s*$/,
        'NC' : /^\s*([Nn]ew\s+[Cc]aledonia)\s*$/,
        'NZ' : /^\s*([Nn]ew\s+[Zz]ealand)\s*$/,
        'NI' : /^\s*([Nn]icaragua)\s*$/,
        'NE' : /^\s*([Nn]iger)\s*$/,
        'NG' : /^\s*([Nn]igeria)\s*$/,
        'NU' : /^\s*([Nn]iue)\s*$/,
        'NF' : /^\s*([Nn]orfolk\s+[Ii]sland)\s*$/,
        'MK' : /^\s*((([Tt]he\s+)?[Rr]epublic\s+[Oo]f\s+)?[Nn]orth\s+[Mm]acedonia)\s*$/,
        'MP' : /^\s*([Nn]orthern\s+[Mm]ariana\s+[Ii]slands)\s*$/,
        'NO' : /^\s*([Nn]orway)\s*$/,
        'OM' : /^\s*([Oo]man)\s*$/,
        'PK' : /^\s*([Pp]akistan)\s*$/,
        'PW' : /^\s*([Pp]alau)\s*$/,
        'PS' : /^\s*((([Tt]he\s+)?[Ss]tate\s+[Oo]f\s+)?[Pp]alestine)\s*$/,
        'PA' : /^\s*([Pp]anama)\s*$/,
        'PG' : /^\s*([Pp]apua\s+[Nn]ew\s+[Gg]uinea)\s*$/,
        'PY' : /^\s*([Pp]araguay)\s*$/,
        'PE' : /^\s*([Pp]eru)\s*$/,
        'PH' : /^\s*([Pp]hilippines)\s*$/,
        'PN' : /^\s*([Pp]itcairn)\s*$/,
        'PL' : /^\s*([Pp]oland)\s*$/,
        'PT' : /^\s*([Pp]ortugal)\s*$/,
        'PR' : /^\s*([Pp]uerto\s+[Rr]ico)\s*$/,
        'QA' : /^\s*([Qq]atar)\s*$/,
        'RE' : /^\s*([Rr][\u00e9e]union)\s*$/,
        'RO' : /^\s*([Rr]omania)\s*$/,
        'RU' : /^\s*([Rr]ussian\s+[Ff]ederation)\s*$/,
        'RW' : /^\s*([Rr]wanda)\s*$/,
        'BL' : /^\s*([Ss]aint\s+[Bb]arth[\u00e9e]lemy)\s*$/,
        'SH' : /^\s*([Ss]aint\s+[Hh]elena(,\s+[Aa]scension,?\s+[Aa]nd\s+[Tt]ristan(\s+[Dd]a\s+[Cc]unha)?)?)\s*$/,
        'KN' : /^\s*([Ss]aint\s+[Kk]itts\s+[Aa]nd\s+[Nn]evis)\s*$/,
        'LC' : /^\s*([Ss]aint\s+[Ll]ucia)\s*$/,
        'MF' : /^\s*([Ss]aint\s+[Mm]artin)\s*$/,
        'PM' : /^\s*([Ss]aint\s+[Pp]ierre\s+[Aa]nd\s+[Mm]iquelon)\s*$/,
        'VC' : /^\s*([Ss]aint\s+[Vv]incent(\s+[Aa]nd\s+([Tt]he\s+)?[Gg]renadines)?)\s*$/,
        'WS' : /^\s*([Ss]amoa)\s*$/,
        'SM' : /^\s*([Ss]an\s+[Mm]arino)\s*$/,
        'ST' : /^\s*([Ss]ao\s+[Tt]ome\s+[Aa]nd\s+[Pp]rincipe)\s*$/,
        'SA' : /^\s*([Ss]audi\s+[Aa]rabia)\s*$/,
        'SN' : /^\s*([Ss]enegal)\s*$/,
        'RS' : /^\s*([Ss]erbia)\s*$/,
        'SC' : /^\s*([Ss]eychelles)\s*$/,
        'SL' : /^\s*([Ss]ierra\s+[Ll]eone)\s*$/,
        'SG' : /^\s*([Ss]ingapore)\s*$/,
        'SX' : /^\s*([Ss]int\s+[Mm]aarten)\s*$/,
        'SK' : /^\s*([Ss]lovakia)\s*$/,
        'SI' : /^\s*([Ss]lovenia)\s*$/,
        'SB' : /^\s*([Ss]olomon\s+[Ii]slands)\s*$/,
        'SO' : /^\s*([Ss]omalia)\s*$/,
        'ZA' : /^\s*((([Tt]he\s+)?[Rr]epublic\s+[Oo]f\s+)?[Ss]outh\s+[Aa]frica)\s*$/,
        'GS' : /^\s*([Ss]outh\s+[Gg]eorgia\s+[Aa]nd\s+([Tt]he\s+)?[Ss]outh\s+[Ss]andwich\s+[Ii]slands)\s*$/,
        'SS' : /^\s*([Ss]outh\s+[Ss]udan)\s*$/,
        'ES' : /^\s*((([Tt]he\s+)?[Kk]ingdom\s+[Oo]f\s+)?[Ss]pain|[Ee]spa[\u00f1n]a)\s*$/,
        'LK' : /^\s*([Ss]ri\s+[Ll]anka)\s*$/,
        'SD' : /^\s*([Ss]udan)\s*$/,
        'SR' : /^\s*([Ss]uriname)\s*$/,
        'SJ' : /^\s*([Ss]valbard\s+[Aa]nd\s+[Jj]an\s+[Mm]ayen)\s*$/,
        'SE' : /^\s*([Ss]weden)\s*$/,
        'CH' : /^\s*([Ss]witzerland)\s*$/,
        'SY' : /^\s*([Ss]yria(n\s+[Aa]rab\s+[Rr]epublic)?)\s*$/,
        'TW' : /^\s*([Tt]aiwan(,?\s+[Pp]rovince\s+[Oo]f\s+[Cc]hina)?)\s*$/,
        'TJ' : /^\s*([Tt]ajikistan)\s*$/,
        'TZ' : /^\s*((([Tt]he\s+)?[Uu]nited\s+[Rr]epublic\s+[Oo]f\s+)?[Tt]anzania)\s*$/,
        'TH' : /^\s*([Tt]hailand)\s*$/,
        'TL' : /^\s*([Tt]imor-[Ll]este)\s*$/,
        'TG' : /^\s*([Tt]ogo)\s*$/,
        'TK' : /^\s*([Tt]okelau)\s*$/,
        'TO' : /^\s*([Tt]onga)\s*$/,
        'TT' : /^\s*([Tt]rinidad\s+[Aa]nd\s+[Tt]obago)\s*$/,
        'TN' : /^\s*([Tt]unisia)\s*$/,
        'TR' : /^\s*([Tt][u\u00fc]rk(ey|iye))\s*$/,
        'TM' : /^\s*([Tt]urkmenistan)\s*$/,
        'TC' : /^\s*([Tt]urks\s+[Aa]nd\s+[Cc]aicos\s+[Ii]slands)\s*$/,
        'TV' : /^\s*([Tt]uvalu)\s*$/,
        'UG' : /^\s*([Uu]ganda)\s*$/,
        'UA' : /^\s*([Uu]kraine)\s*$/,
        'AE' : /^\s*(UAE|[Uu]nited\s+[Aa]rab\s+[Ee]mirates)\s*$/,
        'GB' : /^\s*(U[.]?K[.]?|[Bb]ritain|[Gg]reat\s+[BBb]ritain|[Uu]nited\s+[Kk]ingdom(\s+[Oo]f\s+[Gg]reat\s+[Bb]ritain\s+[Aa]nd\s+[Nn]orthern\s+[Ii]reland)?|[Ee]ngland(\s+[Aa]nd\s+[Ww]ales)?)\s*$/,
        'UM' : /^\s*([Uu]nited\s+[Ss]tates\s+[Mm]inor\s+[Oo]utlying\s+[Ii]slands)\s*$/,
        'US' : /^\s*(U[.]?S[.]?A[.]?|[Uu]nited\s+[Ss]tates(\s+[Oo]f\s+[Aa]merica)?)\s*$/,
        'UY' : /^\s*([Uu]ruguay)\s*$/,
        'UZ' : /^\s*([Uu]zbekistan)\s*$/,
        'VU' : /^\s*([Vv]anuatu)\s*$/,
        'VE' : /^\s*([Vv]enezuela)\s*$/,
        'VN' : /^\s*([Vv]iet\s+[Nn]am)\s*$/,
        'VG' : /^\s*([Bb]ritish\s+[Vv]irgin\s+[Ii]slands|[Vv]irgin\s+[Ii]slands,?\s+[Bb]ritish)\s*$/,
        'VI' : /^\s*([Uu][.]?[Ss][.]?\s+[Vv]irgin\s+[Ii]slands)\s*$/,
        'WF' : /^\s*([Ww]allis\s+[Aa]nd\s+[Ff]utuna)\s*$/,
        'EH' : /^\s*([Ww]estern\s+[Ss]ahara*)\s*$/,
        'YE' : /^\s*([Yy]emen)\s*$/,
        'ZM' : /^\s*([Zz]ambia)\s*$/,
        'ZW' : /^\s*([Zz]imbabwe)\s*$/
      };
      
      for ( var option in regexOptions ) {
        if ( regexOptions[option].exec(element['innerText']) && regexOptions[option].exec(element['innerText'])[0] ) {
          return option;
        }
      }
    }
    return 'Format Error: Country Name EN';
  },
  
  stateProvNameEn : function( element ) {
    if ( element && typeof element === 'object' && element['innerText'] ) {
      
      var regexOptions = {
        'AL' : /^\s*([Aa]labama)\s*$/,
        'AK' : /^\s*([Aa]laska)\s*$/,
        'AZ' : /^\s*([Aa]rizona)\s*$/,
        'AR' : /^\s*([Aa]rkansas)\s*$/,
        'CA' : /^\s*([Cc]alifornia)\s*$/,
        'CO' : /^\s*([Cc]olorado)\s*$/,
        'CT' : /^\s*([Cc]onnecticut)\s*$/,
        'DE' : /^\s*([Dd]elaware)\s*$/,
        'FL' : /^\s*([Ff]lorida)\s*$/,
        'GA' : /^\s*([Gg]eorgia)\s*$/,
        'HI' : /^\s*([Hh]awaii)\s*$/,
        'ID' : /^\s*([Ii]daho)\s*$/,
        'IL' : /^\s*([Ii]llinois)\s*$/,
        'IN' : /^\s*([Ii]ndiana)\s*$/,
        'IA' : /^\s*([Ii]owa)\s*$/,
        'KS' : /^\s*([Kk]ansas)\s*$/,
        'KY' : /^\s*([Kk]entucky)\s*$/,
        'LA' : /^\s*([Ll]ouisiana)\s*$/,
        'ME' : /^\s*([Mm]aine)\s*$/,
        'MD' : /^\s*([Mm]aryland)\s*$/,
        'MA' : /^\s*([Mm]assachusetts)\s*$/,
        'MI' : /^\s*([Mm]ichigan)\s*$/,
        'MN' : /^\s*([Mm]innesota)\s*$/,
        'MS' : /^\s*([Mm]ississippi)\s*$/,
        'MO' : /^\s*([Mm]issouri)\s*$/,
        'MT' : /^\s*([Mm]ontana)\s*$/,
        'NE' : /^\s*([Nn]ebraska)\s*$/,
        'NV' : /^\s*([Nn]evada)\s*$/,
        'NH' : /^\s*([Nn]ew\s+[Hh]ampshire)\s*$/,
        'NJ' : /^\s*([Nn]ew\s+[Jj]ersey)\s*$/,
        'NM' : /^\s*([Nn]ew\s+[Mm]exico)\s*$/,
        'NY' : /^\s*([Nn]ew\s+[Yy]ork)\s*$/,
        'NC' : /^\s*([Nn]orth\s+[Cc]arolina)\s*$/,
        'ND' : /^\s*([Nn]orth\s+[Dd]akota)\s*$/,
        'OH' : /^\s*([Oo]hio)\s*$/,
        'OK' : /^\s*([Oo]klahoma)\s*$/,
        'OR' : /^\s*([Oo]regon)\s*$/,
        'PA' : /^\s*([Pp]ennsylvania)\s*$/,
        'RI' : /^\s*([Rr]hode\s+[Ii]sland)\s*$/,
        'SC' : /^\s*([Ss]outh\s+[Cc]arolina)\s*$/,
        'SD' : /^\s*([Ss]outh\s+[Dd]akota)\s*$/,
        'TN' : /^\s*([Tt]ennessee)\s*$/,
        'TX' : /^\s*([Tt]exas)\s*$/,
        'UT' : /^\s*([Uu]tah)\s*$/,
        'VT' : /^\s*([Vv]ermont)\s*$/,
        'VA' : /^\s*([Vv]irginia)\s*$/,
        'WA' : /^\s*([Ww]ashington)\s*$/,
        'WV' : /^\s*([Ww]est\s+[Vv]irginia)\s*$/,
        'WI' : /^\s*([Ww]isconsin)\s*$/,
        'WY' : /^\s*([Ww]yoming)\s*$/,
        'DC' : /^\s*([Dd]istrict\s+[Oo]f\s+[Cc]olumbia)\s*$/,
        'AS' : /^\s*(([Aa]merican\s+)?[Ss]amoa)\s*$/,
        'GU' : /^\s*([Gg]uam)\s*$/,
        'MP' : /^\s*([Nn]orthern\s+[Mm]ariana\s+[Ii]slands)\s*$/,
        'PR' : /^\s*([Pp]uerto\s+[Rr]ico)\s*$/,
        'UM' : /^\s*([Uu]nited\s+[Ss]tates\s+[Mm]inor\s+[Oo]utlying\s+[Ii]slands)\s*$/,
        'VI' : /^\s*([Vv]irgin\s+[Ii]slands,\s+U[.]S[.])\s*$/,
        'AB' : /^\s*([Aa]lberta)\s*$/,
        'BC' : /^\s*([Bb]ritish\s+[Cc]olumbia)\s*$/,
        'MB' : /^\s*([Mm]anitoba)\s*$/,
        'NB' : /^\s*([Nn]ew\s+[Bb]runswick)\s*$/,
        'NL' : /^\s*([Nn]ewfoundland(\s+[Aa]nd\s+[Ll]abrador)?)\s*$/,
        'NS' : /^\s*([Nn]ova\s+[Ss]cotia)\s*$/,
        'NT' : /^\s*([Nn]orthwest\s+[Tt]erritories)\s*$/,
        'NU' : /^\s*([Nn]unavut)\s*$/,
        'ON' : /^\s*([Oo]ntario)\s*$/,
        'PE' : /^\s*([Pp]rince\s+[Ee]dward\s+[Ii]sland)\s*$/,
        'QC' : /^\s*([Qq]u[e\u00e9]bec)\s*$/,
        'SK' : /^\s*([Ss]askatchewan)\s*$/,
        'YT' : /^\s*([Yy]ukon)\s*$/
      };
      
      for ( var option in regexOptions ) {
        if ( regexOptions[option].exec(element['innerText']) && regexOptions[option].exec(element['innerText'])[0] ) {
          return option;
        }
      }
    }
    return 'Format Error: Country Name EN';
  },
  
  exchNameEn : function( element ) {
    if ( element && typeof element === 'object' && element['innerText'] ) {
      
      var regexOptions = {
        'BOX' : /^\s*(([Tt]he\s+)?[Bb][Oo][Xx]\s+[Ee]xchange(,?\s+[Ll][Ll][Cc])?)\s*$/,
        'CboeBYX' : /^\s*(([Tt]he\s+)?[Cc]boe\s+[Bb][Yy][Xx]\s+[Ee]xchange(,?\s+[Ii]nc[.]?)?)\s*$/,
        'CboeBZX' : /^\s*(([Tt]he\s+)?[Cc]boe\s+[Bb][Zz][Xx]\s+[Ee]xchange(,?\s+[Ii]nc[.]?)?)\s*$/,
        'C2' : /^\s*(([Tt]he\s+)?[Cc]boe\s+[Cc]2\s+[Ee]xchange(,?\s+[Ii]nc[.]?)?)\s*$/,
        'CboeEDGA' : /^\s*(([Tt]he\s+)?[Cc]boe\s+[Ee][Dd][Gg][Aa]\s+[Ee]xchange(,?\s+[Ii]nc[.]?)?)\s*$/,
        'CboeEDGX' : /^\s*(([Tt]he\s+)?[Cc]boe\s+[Ee][Dd][Gg][Xx]\s+[Ee]xchange(,?\s+[Ii]nc[.]?)?)\s*$/,
        'CBOE' : /^\s*(([Tt]he\s+)?[Cc]boe\s+[Ee]xchange(,?\s+[Ii]nc[.]?)?)\s*$/,
        'CHX' : /^\s*(([Tt]he\s+)?[Cc]hicago\s+[Ss]tock\s+[Ee]xchange(,?\s+[Ii]nc[.]?)?)\s*$/,
        'IEX' : /^\s*(([Tt]he\s+)?[Ii]nvestors\s+[Ee]xchange(,?\s+[Ll][Ll][Cc])?)\s*$/,
        'MIAX' : /^\s*(([Tt]he\s+)?[Mm]iami\s+[Ii]nternational\s+[Ss]ecurities\s+[Ee]xchange(,?\s+[Ll][Ll][Cc])?)\s*$/,
        'PEARL' : /^\s*(([Tt]he\s+)?[Mm]IAX\s+[Pp]EARL(,?\s+[Ll][Ll][Cc])?)\s*$/,
        'BX' : /^\s*(([Tt]he\s+)?[Nn][Aa][Ss][Dd][Aa][Qq]\s+[Bb][Xx](,?\s+[Ii]nc[.]?)?)\s*$/,
        'GEMX' : /^\s*(([Tt]he\s+)?[Nn][Aa][Ss][Dd][Aa][Qq]\s+[Gg][Ee][Mm][Xx](,?\s+[Ll][Ll][Cc])?)\s*$/,
        'ISE' : /^\s*(([Tt]he\s+)?[Nn][Aa][Ss][Dd][Aa][Qq]\s+[Ii][Ss][Ee](,?\s+[Ll][Ll][Cc])?)\s*$/,
        'MRX' : /^\s*(([Tt]he\s+)?[Nn][Aa][Ss][Dd][Aa][Qq]\s+[Mm][Rr][Xx](,?\s+[Ll][Ll][Cc])?)\s*$/,
        'Phlx' : /^\s*([Nn][Aa][Ss][Dd][Aa][Qq]\s+[Pp][Hh][Ll][Xx](,?\s+[Ll][Ll][Cc])?)\s*$/,
        'NYSE' : /^\s*(([Tt]he\s+)?[Nn][Yy][Ss][Ee]|([Tt]he\s+)?[Nn]ew\s+[Yy]ork\s+[Ss]tock\s+[Ee]xchange(,?\s+[Ll][Ll][Cc])?)\s*$/,
        'NYSEAMER' : /^\s*(([Tt]he\s+)?[Nn][Yy][Ss][Ee]\s+[Aa]merican(,?\s+[Ll][Ll][Cc])?)\s*$/,
        'NYSEArca' : /^\s*(([Tt]he\s+)?[Nn][Yy][Ss][Ee]\s+[Aa]rca(,?\s+[Ii]nc[.]?)?)\s*$/,
        'NYSENAT' : /^\s*(([Tt]he\s+)?[Nn][Yy][Ss][Ee]\s+[Nn]ational(,?\s+[Ii]nc[.]?)?)\s*$/,
        'NASDAQ' : /^\s*(([Tt]he\s+)?[Nn][Aa][Ss][Dd][Aa][Qq](\s+([Ss]tock|[Gg]lobal(\s+[Ss]elect)?)\s+[Mm]arket(,?\s+[Ll][Ll][Cc])?)?)\s*$/
      };
      for ( var option in regexOptions ) {
        if ( regexOptions[option].exec(element['innerText']) && regexOptions[option].exec(element['innerText'])[0] ) {
          return option;
        }
      }
    }
    return 'Format Error: Exch Name EN';
  },
  
  edgarProvCountryEn : function( element ) {
    if ( element && typeof element === 'object' && element['innerText'] ) {
      
      var regexOptions = {
        'B5' : /^\s*([Aa]merican\s+[Ss]amoa)\s*$/,
        'GU' : /^\s*([Gg]uam)\s*$/,
        'PR' : /^\s*([Pp]uerto\s+[Rr]ico)\s*$/,
        '2J' : /^\s*([Uu]nited\s+[Ss]tates\s+[Mm]inor\s+[Oo]utlying\s+[Ii]slands)\s*$/,
        'VI' : /^\s*([Vv]irgin\s+[Ii]slands,\s+U[.]?S[.]?|U([.]\s*)?S[.]?\s+[Vv]irgin\s+[Ii]slands)\s*$/,
        'A0' : /^\s*([Aa]lberta(,?\s+[Cc]anada)?)\s*$/,
        'A1' : /^\s*([Bb]ritish\s+[Cc]olumbia(,?\s+[Cc]anada)?)\s*$/,
        'A2' : /^\s*([Mm]anitoba(,?\s+[Cc]anada)?)\s*$/,
        'A3' : /^\s*([Nn]ew\s+[Bb]runswick(,?\s+[Cc]anada)?)\s*$/,
        'A4' : /^\s*([Nn]ewfoundland(\s+[Aa]nd\s+[Ll]abrador)?(,?\s+[Cc]anada)?)\s*$/,
        'A5' : /^\s*([Nn]ova\s+[Ss]cotia(,?\s+[Cc]anada)?)\s*$/,
        'A6' : /^\s*([Oo]ntario(,?\s+[Cc]anada)?)\s*$/,
        'A7' : /^\s*([Pp]rince\s+[Ee]dward\s+[Ii]sland(,?\s+[Cc]anada)?)\s*$/,
        'A8' : /^\s*([Qq]u[e\u00e9]bec(,?\s+[Cc]anada)?)\s*$/,
        'A9' : /^\s*([Ss]askatchewan(,?\s+[Cc]anada)?)\s*$/,
        'B0' : /^\s*([Yy]ukon(,?\s+[Cc]anada)?)\s*$/,
        'B2' : /^\s*([Aa]fghanistan)\s*$/,
        'Y6' : /^\s*([\u00c5\u00e5Aa]land\s+[Ii]slands)\s*$/,
        'B3' : /^\s*([Aa]lbania)\s*$/,
        'B4' : /^\s*([Aa]lgeria)\s*$/,
        'B6' : /^\s*([Aa]ndorra)\s*$/,
        'B7' : /^\s*([Aa]ngola)\s*$/,
        '1A' : /^\s*([Aa]nguilla)\s*$/,
        'B8' : /^\s*([Aa]ntarctica)\s*$/,
        'B9' : /^\s*([Aa]ntigua\s+[Aa]nd\s+[Bb]arbuda)\s*$/,
        'C1' : /^\s*((([Tt]he\s+)?[Rr]epublic\s+[Oo]f\s+)?[Aa]rgentina)\s*$/,
        '1B' : /^\s*([Aa]rmenia)\s*$/,
        '1C' : /^\s*([Aa]ruba)\s*$/,
        'C3' : /^\s*([Aa]ustralia)\s*$/,
        'C4' : /^\s*([Aa]ustria)\s*$/,
        '1D' : /^\s*([Aa]zerbaijan)\s*$/,
        'C5' : /^\s*([Bb]ahamas)\s*$/,
        'C6' : /^\s*([Bb]ahrain)\s*$/,
        'C7' : /^\s*([Bb]angladesh)\s*$/,
        'C8' : /^\s*([Bb]arbados)\s*$/,
        '1F' : /^\s*([Bb]elarus)\s*$/,
        'C9' : /^\s*([Bb]elgium)\s*$/,
        'D1' : /^\s*([Bb]elize)\s*$/,
        'G6' : /^\s*([Bb]enin)\s*$/,
        'D0' : /^\s*([Bb]ermuda)\s*$/,
        'D2' : /^\s*([Bb]hutan)\s*$/,
        'D3' : /^\s*([Bb]olivia)\s*$/,
        '1E' : /^\s*([Bb]osnia\s+[Aa]nd\s+[Hh]erzegovina)\s*$/,
        'B1' : /^\s*([Bb]otswana)\s*$/,
        'D4' : /^\s*([Bb]ouvet\s+[Ii]sland)\s*$/,
        'D5' : /^\s*((([Tt]he\s+)?[Ff]ederative\s+[Rr]epublic\s+[Oo]f\s+)?[Bb]ra[sz]il)\s*$/,
        'D6' : /^\s*([Bb]ritish\s+[Ii]ndian\s+[Oo]cean\s+[Tt]erritory)\s*$/,
        'D9' : /^\s*([Bb]runei\s+[Dd]arussalam)\s*$/,
        'E0' : /^\s*([Bb]ulgaria)\s*$/,
        'X2' : /^\s*([Bb]urkina\s+[Ff]aso)\s*$/,
        'E2' : /^\s*([Bb]urundi)\s*$/,
        'E8' : /^\s*([Cc]a(bo|pe)\s+[Vv]erde)\s*$/,
        'E3' : /^\s*([Cc]ambodia)\s*$/,
        'E4' : /^\s*([Cc]ameroon)\s*$/,
        'Z4' : /^\s*([Cc]anada)\s*$/,
        'E9' : /^\s*([Cc]ayman\s+[Ii]slands)\s*$/,
        'F0' : /^\s*([Cc]entral\s+[Aa]frican\s+[Rr]epublic)\s*$/,
        'F2' : /^\s*([Cc]had)\s*$/,
        'F3' : /^\s*([Cc]hile)\s*$/,
        'F4' : /^\s*((([Tt]he\s+)?[Pp]eople['\u2019]?s\s+[Rr]epublic\s+[Oo]f\s+)?[Cc]hina)\s*$/,
        'F6' : /^\s*([Cc]hristmas\s+[Ii]sland)\s*$/,
        'F7' : /^\s*([Cc]ocos\s+(.[Kk]eeling.\s+)?[Ii]slands)\s*$/,
        'F8' : /^\s*((([Tt]he\s+)?[Rr]epublic\s+[Oo]f\s+)?[Cc]olombia)\s*$/,
        'F9' : /^\s*([Cc]omoros)\s*$/,
        'Y3' : /^\s*([Dd]emocratic\s+[Rr]epublic\s+[Oo]f\s+([Tt]he\s+)?[Cc]ongo)\s*$/,
        'G0' : /^\s*([Cc]ongo)\s*$/,
        'G1' : /^\s*([Cc]ook\s+[Ii]slands)\s*$/,
        'G2' : /^\s*([Cc]osta\s+[Rr]ica)\s*$/,
        'L7' : /^\s*([Cc][\u00f4o]te\s+d['\u2019][Ii]voire)\s*$/,
        '1M' : /^\s*([Cc]roatia)\s*$/,
        'G3' : /^\s*([Cc]uba)\s*$/,
        'G4' : /^\s*([Cc]yprus)\s*$/,
        '2N' : /^\s*([Cc]zechia|[Cc]zech\s+[Rr]epublic)\s*$/,
        'G7' : /^\s*((([Tt]he\s+)?[Kk]ingdom\s+[Oo]f\s+)?[Dd]enmark)\s*$/,
        '1G' : /^\s*([Dd]jibouti)\s*$/,
        'G9' : /^\s*([Dd]ominica)\s*$/,
        'G8' : /^\s*([Dd]ominican\s+[Rr]epublic)\s*$/,
        'H1' : /^\s*([Ee]cuador)\s*$/,
        'H2' : /^\s*([Ee]gypt)\s*$/,
        'H3' : /^\s*([Ee]l\s+[Ss]alvador)\s*$/,
        'H4' : /^\s*([Ee]quatorial\s+[Gg]uinea)\s*$/,
        '1J' : /^\s*([Ee]ritrea)\s*$/,
        '1H' : /^\s*([Ee]stonia)\s*$/,
        'H5' : /^\s*([Ee]thiopia)\s*$/,
        'H7' : /^\s*(([Tt]he\s+)?[Ff]alkland\s+[Ii]slands(\s+.[Mm]alvinas.)?|([Ii]slas\s+)?[Mm]alvinas(\s+[Ii]slands)?)\s*$/,
        'H6' : /^\s*([Ff]aroe\s+[Ii]slands)\s*$/,
        'H8' : /^\s*([Ff]iji)\s*$/,
        'H9' : /^\s*([Ff]inland)\s*$/,
        'I0' : /^\s*([Ff]rance)\s*$/,
        'I3' : /^\s*([Ff]rench\s+[Gg]uiana)\s*$/,
        'I4' : /^\s*([Ff]rench\s+[Pp]olynesia)\s*$/,
        '2C' : /^\s*([Ff]rench\s+[Ss]outhern\s+[Tt]erritories)\s*$/,
        'I5' : /^\s*([Gg]abon)\s*$/,
        'I6' : /^\s*([Gg]ambia)\s*$/,
        '2Q' : /^\s*([Gg]eorgia)\s*$/,
        '2M' : /^\s*([Gg]ermany)\s*$/,
        'J0' : /^\s*([Gg]hana)\s*$/,
        'J1' : /^\s*([Gg]ibraltar)\s*$/,
        'J3' : /^\s*([Gg]reece)\s*$/,
        'J4' : /^\s*([Gg]reenland)\s*$/,
        'J5' : /^\s*([Gg]renada)\s*$/,
        'J6' : /^\s*([Gg]uadeloupe)\s*$/,
        'J8' : /^\s*([Gg]uatemala)\s*$/,
        'Y7' : /^\s*([Gg]uernsey)\s*$/,
        'J9' : /^\s*([Gg]uinea)\s*$/,
        'S0' : /^\s*([Gg]uinea-[Bb]issau)\s*$/,
        'K0' : /^\s*([Gg]uyana)\s*$/,
        'K1' : /^\s*([Hh]aiti)\s*$/,
        'K4' : /^\s*([Hh]eard\s+[Ii]sland\s+[Aa]nd\s+[Mm]cDonald\s+[Ii]slands)\s*$/,
        'X4' : /^\s*(([Tt]he\s+)?[Hh]oly\s+[Ss]ee|[Vv]atican\s+[Cc]ity)\s*$/,
        'K2' : /^\s*([Hh]onduras)\s*$/,
        'K3' : /^\s*([Hh]ong\s+[Kk]ong)\s*$/,
        'K5' : /^\s*([Hh]ungary)\s*$/,
        'K6' : /^\s*([Ii]celand)\s*$/,
        'K7' : /^\s*([Ii]ndia)\s*$/,
        'K8' : /^\s*([Ii]ndonesia)\s*$/,
        'K9' : /^\s*((([Tt]he\s+)?[Ii]slamic\s+[Rr]epublic\s+of\s+)?[Ii]ran)\s*$/,
        'L0' : /^\s*([Ii]raq)\s*$/,
        'L2' : /^\s*([Ii]reland)\s*$/,
        'Y8' : /^\s*([Ii]sle\s+[Oo]f\s+[Mm]an)\s*$/,
        'L3' : /^\s*([Ii]srael)\s*$/,
        'L6' : /^\s*([Ii]taly)\s*$/,
        'L8' : /^\s*([Jj]amaica)\s*$/,
        'M0' : /^\s*([Jj]apan)\s*$/,
        'Y9' : /^\s*([Jj]ersey)\s*$/,
        'M2' : /^\s*([Jj]ordan)\s*$/,
        '1P' : /^\s*([Kk]azakhstan)\s*$/,
        'M3' : /^\s*([Kk]enya)\s*$/,
        'J2' : /^\s*([Kk]iribati)\s*$/,
        'M4' : /^\s*(([Nn]orth|[Dd]emocratic\s+[Pp]eople['\u2019]?s\s+[Rr]epublic\s+[Oo]f)\s+[Kk]orea)\s*$/,
        'M5' : /^\s*(([Ss]outh|[Rr]epublic\s+[Oo]f)\s+[Kk]orea)\s*$/,
        'M6' : /^\s*([Kk]uwait)\s*$/,
        '1N' : /^\s*([Kk]yrgyzstan)\s*$/,
        'M7' : /^\s*([Ll]ao\s+[Pp]eople['\u2019]?s\s+[Dd]emocratic\s+[Rr]epublic)\s*$/,
        '1R' : /^\s*([Ll]atvia)\s*$/,
        'M8' : /^\s*([Ll]ebanon)\s*$/,
        'M9' : /^\s*([Ll]esotho)\s*$/,
        'N0' : /^\s*([Ll]iberia)\s*$/,
        'N1' : /^\s*((([Tt]he\s+)?[Ss]tate\s+[Oo]f\s+)?[Ll]ibya)\s*$/,
        'N2' : /^\s*([Ll]iechtenstein)\s*$/,
        '1Q' : /^\s*([Ll]ithuania)\s*$/,
        'N4' : /^\s*((([Tt]he\s+)?([Gg]rand\s+)?[Dd]uchy\s+[Oo]f\s+)?[Ll]uxembourg)\s*$/,
        'N5' : /^\s*([Mm]aca[ou])\s*$/,
        '1U' : /^\s*((([Tt]he\s+)?[Rr]epublic\s+[Oo]f\s+)?([Nn]orth\s+)?[Mm]acedonia)\s*$/,
        'N6' : /^\s*([Mm]adagascar)\s*$/,
        'N7' : /^\s*([Mm]alawi)\s*$/,
        'N8' : /^\s*([Mm]alaysia)\s*$/,
        'N9' : /^\s*([Mm]aldives)\s*$/,
        'O0' : /^\s*([Mm]ali)\s*$/,
        'O1' : /^\s*([Mm]alta)\s*$/,
        '1T' : /^\s*((([Tt]he\s+)?[Rr]epublic\s+[Oo]f\s+([Tt]he\s+)?)?[Mm]arshall\s+[Ii]slands)\s*$/,
        'O2' : /^\s*([Mm]artinique)\s*$/,
        'O3' : /^\s*([Mm]auritania)\s*$/,
        'O4' : /^\s*([Mm]auritius)\s*$/,
        '2P' : /^\s*([Mm]ayotte)\s*$/,
        'O5' : /^\s*([Mm]exico|[Uu]nited\s+[Mm]exican\s+[Ss]tates)\s*$/,
        '1K' : /^\s*((([Tt]he\s+)?[Ff]ederated\s+[Ss]tates\s+[Oo]f\s+)?[Mm]icronesia)\s*$/,
        '1S' : /^\s*((([Tt]he\s+)?[Rr]epublic\s+[Oo]f\s+)?[Mm]oldova)\s*$/,
        'O9' : /^\s*([Mm]onaco)\s*$/,
        'P0' : /^\s*([Mm]ongolia)\s*$/,
        'Z5' : /^\s*([Mm]ontenegro)\s*$/,
        'P1' : /^\s*([Mm]ontserrat)\s*$/,
        'P2' : /^\s*([Mm]orocco)\s*$/,
        'P3' : /^\s*([Mm]ozambique)\s*$/,
        'E1' : /^\s*([Mm]yanmar)\s*$/,
        'T6' : /^\s*([Nn]amibia)\s*$/,
        'P5' : /^\s*([Nn]auru)\s*$/,
        'P6' : /^\s*([Nn]epal)\s*$/,
        'P8' : /^\s*([Nn]etherlands\s+[Aa]ntilles)\s*$/,
        'P7' : /^\s*([Nn]etherlands)\s*$/,
        '1W' : /^\s*([Nn]ew\s+[Cc]aledonia)\s*$/,
        'Q2' : /^\s*([Nn]ew\s+[Zz]ealand)\s*$/,
        'Q3' : /^\s*([Nn]icaragua)\s*$/,
        'Q4' : /^\s*([Nn]iger)\s*$/,
        'Q5' : /^\s*([Nn]igeria)\s*$/,
        'Q6' : /^\s*([Nn]iue)\s*$/,
        'Q7' : /^\s*([Nn]orfolk\s+[Ii]sland)\s*$/,
        '1V' : /^\s*([Nn]orthern\s+[Mm]ariana\s+[Ii]slands)\s*$/,
        'Q8' : /^\s*([Nn]orway)\s*$/,
        'P4' : /^\s*([Oo]man)\s*$/,
        'R0' : /^\s*([Pp]akistan)\s*$/,
        '1Y' : /^\s*([Pp]alau)\s*$/,
        '1X' : /^\s*((([Tt]he\s+)?[Ss]tate\s+[Oo]f\s+)?[Pp]alestine)\s*$/,
        'R1' : /^\s*([Pp]anama)\s*$/,
        'R2' : /^\s*([Pp]apua\s+[Nn]ew\s+[Gg]uinea)\s*$/,
        'R4' : /^\s*([Pp]araguay)\s*$/,
        'R5' : /^\s*([Pp]eru)\s*$/,
        'R6' : /^\s*([Pp]hilippines)\s*$/,
        'R8' : /^\s*([Pp]itcairn)\s*$/,
        'R9' : /^\s*([Pp]oland)\s*$/,
        'S1' : /^\s*([Pp]ortugal)\s*$/,
        'S3' : /^\s*([Qq]atar)\s*$/,
        'S4' : /^\s*([Rr][\u00e9e]union)\s*$/,
        'S5' : /^\s*([Rr]omania)\s*$/,
        '1Z' : /^\s*([Rr]ussian\s+[Ff]ederation)\s*$/,
        'S6' : /^\s*([Rr]wanda)\s*$/,
        'Z0' : /^\s*([Ss]aint\s+[Bb]arth[\u00e9e]lemy)\s*$/,
        'U8' : /^\s*([Ss]aint\s+[Hh]elena(,\s+[Aa]scension,?\s+[Aa]nd\s+[Tt]ristan(\s+[Dd]a\s+[Cc]unha)?)?)\s*$/,
        'U7' : /^\s*([Ss]aint\s+[Kk]itts\s+[Aa]nd\s+[Nn]evis)\s*$/,
        'U9' : /^\s*([Ss]aint\s+[Ll]ucia)\s*$/,
        'Z1' : /^\s*([Ss]aint\s+[Mm]artin)\s*$/,
        'V0' : /^\s*([Ss]aint\s+[Pp]ierre\s+[Aa]nd\s+[Mm]iquelon)\s*$/,
        'V1' : /^\s*([Ss]aint\s+[Vv]incent(\s+[Aa]nd\s+([Tt]he\s+)?[Gg]renadines)?)\s*$/,
        'Y0' : /^\s*([Ss]amoa)\s*$/,
        'S8' : /^\s*([Ss]an\s+[Mm]arino)\s*$/,
        'S9' : /^\s*([Ss]ao\s+[Tt]ome\s+[Aa]nd\s+[Pp]rincipe)\s*$/,
        'T0' : /^\s*([Ss]audi\s+[Aa]rabia)\s*$/,
        'T1' : /^\s*([Ss]enegal)\s*$/,
        'Z2' : /^\s*([Ss]erbia)\s*$/,
        'T2' : /^\s*([Ss]eychelles)\s*$/,
        'T8' : /^\s*([Ss]ierra\s+[Ll]eone)\s*$/,
        'U0' : /^\s*([Ss]ingapore)\s*$/,
        '2B' : /^\s*([Ss]lovakia)\s*$/,
        '2A' : /^\s*([Ss]lovenia)\s*$/,
        'D7' : /^\s*([Ss]olomon\s+[Ii]slands)\s*$/,
        'U1' : /^\s*([Ss]omalia)\s*$/,
        'T3' : /^\s*((([Tt]he\s+)?[Rr]epublic\s+[Oo]f\s+)?[Ss]outh\s+[Aa]frica)\s*$/,
        '1L' : /^\s*([Ss]outh\s+[Gg]eorgia\s+[Aa]nd\s+([Tt]he\s+)?[Ss]outh\s+[Ss]andwich\s+[Ii]slands)\s*$/,
        'U3' : /^\s*((([Tt]he\s+)?[Kk]ingdom\s+[Oo]f\s+)?[Ss]pain|[Ee]spa[n\u00f1]a)\s*$/,
        'F1' : /^\s*([Ss]ri\s+[Ll]anka)\s*$/,
        'V2' : /^\s*([Ss]udan)\s*$/,
        'V3' : /^\s*([Ss]uriname)\s*$/,
        'L9' : /^\s*([Ss]valbard\s+[Aa]nd\s+[Jj]an\s+[Mm]ayen)\s*$/,
        'V6' : /^\s*([Ss]waziland)\s*$/,
        'V7' : /^\s*([Ss]weden)\s*$/,
        'V8' : /^\s*([Ss]witzerland)\s*$/,
        'V9' : /^\s*([Ss]yria(n\s+[Aa]rab\s+[Rr]epublic)?)\s*$/,
        'F5' : /^\s*([Tt]aiwan(,?\s+[Pp]rovince\s+[Oo]f\s+[Cc]hina)?)\s*$/,
        '2D' : /^\s*([Tt]ajikistan)\s*$/,
        'W0' : /^\s*((([Tt]he\s+)?[Uu]nited\s+[Rr]epublic\s+[Oo]f\s+)?[Tt]anzania)\s*$/,
        'W1' : /^\s*([Tt]hailand)\s*$/,
        'Z3' : /^\s*([Tt]imor-[Ll]este)\s*$/,
        'W2' : /^\s*([Tt]ogo)\s*$/,
        'W3' : /^\s*([Tt]okelau)\s*$/,
        'W4' : /^\s*([Tt]onga)\s*$/,
        'W5' : /^\s*([Tt]rinidad\s+[Aa]nd\s+[Tt]obago)\s*$/,
        'W6' : /^\s*([Tt]unisia)\s*$/,
        'W8' : /^\s*([Tt]urkey)\s*$/,
        '2E' : /^\s*([Tt]urkmenistan)\s*$/,
        'W7' : /^\s*([Tt]urks\s+[Aa]nd\s+[Cc]aicos\s+[Ii]slands)\s*$/,
        '2G' : /^\s*([Tt]uvalu)\s*$/,
        'W9' : /^\s*([Uu]ganda)\s*$/,
        '2H' : /^\s*([Uu]kraine)\s*$/,
        'C0' : /^\s*(UAE|[Uu]nited\s+[Aa]rab\s+[Ee]mirates)\s*$/,
        'X0' : /^\s*(U[.]?K[.]?|[Bb]ritain|[Gg]reat\s+[BBb]ritain|[Uu]nited\s+[Kk]ingdom(\s+[Oo]f\s+[Gg]reat\s+[Bb]ritain\s+[Aa]nd\s+[Nn]orthern\s+[Ii]reland)?|[Ee]ngland(\s+[Aa]nd\s+[Ww]ales)?)\s*$/,
        'X1' : /^\s*(U[.]?S[.]?A[.]?|[Uu]nited\s+[Ss]tates(\s+[Oo]f\s+[Aa]merica)?)\s*$/,
        'X3' : /^\s*([Uu]ruguay)\s*$/,
        '2K' : /^\s*([Uu]zbekistan)\s*$/,
        '2L' : /^\s*([Vv]anuatu)\s*$/,
        'X5' : /^\s*([Vv]enezuela)\s*$/,
        'Q1' : /^\s*([Vv]iet\s+[Nn]am)\s*$/,
        'D8' : /^\s*([Bb]ritish\s+[Vv]irgin\s+[Ii]slands|[Vv]irgin\s+[Ii]slands,?\s+[Bb]ritish)\s*$/,
        'X8' : /^\s*([Ww]allis\s+[Aa]nd\s+[Ff]utuna)\s*$/,
        'U5' : /^\s*([Ww]estern\s+[Ss]ahara*)\s*$/,
        'T7' : /^\s*([Yy]emen)\s*$/,
        'Y4' : /^\s*([Zz]ambia)\s*$/,
        'Y5' : /^\s*([Zz]imbabwe)\s*$/,
        'XX' : /^\s*([Uu]nknown)\s*$/
      };
      
      for ( var option in regexOptions ) {
        if ( regexOptions[option].exec(element['innerText']) && regexOptions[option].exec(element['innerText'])[0] ) {
          return option;
        }
      }
      
    }
    return 'Format Error: Edgar Prov Country EN';
  },
  
  entityFilerCategoryEn : function( element ) {
    if ( element && typeof element === 'object' && element['innerText'] ) {
      
      var regexOptions = {
        'Large Accelerated Filer' : /^\s*([Ll]arge\s+[Aa]ccelerated\s+[Ff]iler)\s*$/,
        'Accelerated Filer' : /^\s*([Aa]ccelerated\s+[Ff]iler)\s*$/,
        'Non-accelerated Filer' : /^\s*([Nn]on[^\w]+[Aa]ccelerated\s+[Ff]iler)\s*$/
      };
      for ( var option in regexOptions ) {
        if ( regexOptions[option].exec(element['innerText']) ) {
          return option;
        }
      }
    }
    return 'Format Error: Entity Filer Category EN';
    
  },
  
  noContent : function( element ) {
    return '';
  },
  
  zeroDash : function( element ) {
    
    if ( element && typeof element === 'object' && element['innerText'] ) {
      
      var regex = /^\s*([-]| |\u002D|\u002D|\u058A|\u05BE|\u2010|\u2011|\u2012|\u2013|\u2014|\u2015|\uFE58|\uFE63|\uFF0D)\s*$/;
      
      if ( regex.test(element.innerText) ) {
        return '0';
      }
    }
    return 'Format Error: Zero Dash';
  }
};
