console.log('[+] Trace initiated...');

var malloc_list = [];
var free_list = [];

Interceptor.attach(Module.findExportByName(null, 'malloc'),
    {
      onLeave: function (retval) {
        malloc_list.push(retval.toString(16))
        console.log("[+] malloc: 0x" + retval.toString(16));
      }
    });

Interceptor.attach(Module.findExportByName(null, 'free'),
    {
      onEnter: function (args) {
        free_list.push(args[0].toString(16))
        console.log("[+] free: 0x" + args[0].toString(16) + ")");
      }
    });
 
Interceptor.attach(Module.findExportByName(null, 'system'),
    {
      onEnter: function (args) {
       console.log("[+] Exiting...");

        for(var i = 0; i < malloc_list.length; ++i) {
          var address = malloc_list[i];
          var includes = false;
          
          for(var j = 0; j < free_list.length; ++j) {
            var freed_address = free_list[i];
            if(address == freed_address) {
              includes = true;
            }
          }

          if(!includes) {
            console.log('[!] Memory leak at 0x' + address);
          }
        }
    }
   });
