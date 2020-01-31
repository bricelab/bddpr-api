/**
 * 
 * 
 * 
 */

// var site_url = "http://localhost:8000";

var site_url = "http://localhost/web_projects/Professional_Projects/bddpr-api/public/api";
var auth_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1ODA0NjE4NTAsImV4cCI6MTU4MDQ2NTQ1MCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGduYUBwcmVzaWRlbmNlLmJqIn0.ju_JVV5j2r5D2AM9ZO__tk4Y1H79yevVrt4ZLG8Ctm79JSCQ3w7aSCIh4b7S0OH7R8hh3Dhk_w_7Mh06_wXqGrdgXLTTtqD9J_lxpJHanRaYwQxTjFZv8mSGUQxlWBVMQrSVUGN0fBfkVwF3UEQHWU1am8hqJijOdpcWQAszyoHHkevWiWYbdKqIrGanvJx9sZ1beDcfcR-z8v5tRAh67X2IE61c3FFCUFAYwfz2JFlEukN0Zp-rqRkzRxYwMGhMh18PflCUbSZd9TwsZeaEBZ_IHbhzsv6rkpkqzVFN96WG7u9DFfNnciLfYExUaZm2xjmgkvPQzM6Mlf1qX-MVwnCEVYJkDvTac8DTeR_6Tgoau68bIkgJ8viWD32kNWRvYf4aNo3-CtPe0E3tw-rncI0Bqs9745fBK06Axj5V0QPQZVaoYGNTLBpQdWzZMb5YB2SUVhzdfKsqz6C3voh_xsBml1xLELRXFTbURmkNulS7CTXqQGEADCgCbgliixG_UIvd7P2pySjJC5yDpFPRQXmnHoFtplnjASarydJUjzn-ToUIFJ5ta66FxToUtf3wgB3USf4fyHuQZ-mQavxOLUf3VYoW5hY1O5cDSjhud-yelIgvRdrLlDePf2-QgfxWRw8j2-PvbarfSpK6mzUC_Uxdx7PGFFD55-ofv-sXKl4";


// Generic functions
function performAjaxRequest(route, type, dataType, data, onRequestSuccess, onRequestFailure, onRequestCompletion){

	$.ajax({

      url       : 	route,
      dataType  : 	dataType,
      type      : 	type,
      data      : 	data,
      headers   :   {"Authorization": "Bearer "+auth_token},
      
      success   :   onRequestSuccess,
      error     : 	onRequestFailure,
      complete 	: 	onRequestCompletion,
    });
}

