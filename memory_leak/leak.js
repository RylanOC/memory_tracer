console.log('[+] Trace initiated...');

var malloc_list = [];
var free_list = [];

Interceptor.attach(Module.findExportByName(null, 'malloc'),
		{
			onLeave: function (retval) {
        malloc_list.push(retval)
				console.log("malloc: 0x" + retval.toString(16));
			}
		});

Interceptor.attach(Module.findExportByName(null, 'free'),
		{
			onEnter: function (args) {
        free_list.push(args[0])
				console.log("free: 0x" + args[0].toString(16) + ")");
			}
    });
  
Interceptor.attach(Module.findExportByName(null, 'exit'),
    {
      onLeave: function (retval) {
       console.log("[+] Exiting...");

       /*
       malloc_list.forEach(addr => function(addr) {
         if(free_list.includes(addr)) {
           console.log("leak at " + addr);
          }
        };
      )
      */
    }
   });
