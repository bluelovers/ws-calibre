"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const log_1 = require("./log");
const index_1 = __importDefault(require("./opds/index"));
const db_1 = __importDefault(require("./opds/db"));
function createHandler(options) {
    const { dbList } = options;
    const router = express_1.Router();
    log_1.console.dir(dbList);
    router.use('/+:dbID', async (req, res, next) => {
        let { dbID } = req.params;
        if (dbID && dbList[dbID]) {
            log_1.console.dir({
                dbID,
                name: dbList[dbID].name,
            });
            res.setHeader('Content-Type', 'application/xml');
            let feed = await db_1.default(options, { dbID });
            res.send(feed.toXML());
        }
        else {
            if (dbID) {
                log_1.console.error(`dbID: ${dbID} 不存在`);
            }
            return next();
        }
    });
    let opdsIndex = (req, res, next) => {
        res.setHeader('Content-Type', 'application/xml');
        res.send(index_1.default(options).toXML());
    };
    router.use('/opds(\.xml)?', opdsIndex);
    router.use('/', opdsIndex);
    router.use('*', (req, res, next) => {
        return next();
    });
    return router;
}
exports.default = createHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxQ0FBb0Q7QUFHcEQsK0JBQWdDO0FBQ2hDLHlEQUEwQztBQUMxQyxtREFBb0M7QUFFcEMsU0FBUyxhQUFhLENBQUMsT0FBOEI7SUFFcEQsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUUzQixNQUFNLE1BQU0sR0FBRyxnQkFBTSxFQUFFLENBQUM7SUFFeEIsYUFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVwQixNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUU5QyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUkxQixJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQ3hCO1lBQ0MsYUFBTyxDQUFDLEdBQUcsQ0FBQztnQkFDWCxJQUFJO2dCQUNKLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSTthQUN2QixDQUFDLENBQUM7WUFFSCxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2pELElBQUksSUFBSSxHQUFHLE1BQU0sWUFBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDaEQsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN2QjthQUVEO1lBQ0MsSUFBSSxJQUFJLEVBQ1I7Z0JBQ0MsYUFBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLENBQUM7YUFDbkM7WUFFRCxPQUFPLElBQUksRUFBRSxDQUFDO1NBQ2Q7SUFDRixDQUFDLENBQUMsQ0FBQztJQUVILElBQUksU0FBUyxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7UUFFbkUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUNqRCxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQztJQUVGLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRTNCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7UUFFbkUsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNmLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUE7QUFDZCxDQUFDO0FBRUQsa0JBQWUsYUFBYSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UsIFJvdXRlciB9IGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IHsgSVNoYXJlZEhhbmRsZXJPcHRpb25zIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBOZXh0RnVuY3Rpb24gfSBmcm9tICdleHByZXNzLXNlcnZlLXN0YXRpYy1jb3JlJztcbmltcG9ydCB7IGNvbnNvbGUgfSBmcm9tICcuL2xvZyc7XG5pbXBvcnQgYnVpbGRPUERTSW5kZXggZnJvbSAnLi9vcGRzL2luZGV4JztcbmltcG9ydCBidWlsZE9QRFNJRCBmcm9tICcuL29wZHMvZGInO1xuXG5mdW5jdGlvbiBjcmVhdGVIYW5kbGVyKG9wdGlvbnM6IElTaGFyZWRIYW5kbGVyT3B0aW9ucylcbntcblx0Y29uc3QgeyBkYkxpc3QgfSA9IG9wdGlvbnM7XG5cblx0Y29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5cblx0Y29uc29sZS5kaXIoZGJMaXN0KTtcblxuXHRyb3V0ZXIudXNlKCcvKzpkYklEJywgYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PlxuXHR7XG5cdFx0bGV0IHsgZGJJRCB9ID0gcmVxLnBhcmFtcztcblxuXG5cblx0XHRpZiAoZGJJRCAmJiBkYkxpc3RbZGJJRF0pXG5cdFx0e1xuXHRcdFx0Y29uc29sZS5kaXIoe1xuXHRcdFx0XHRkYklELFxuXHRcdFx0XHRuYW1lOiBkYkxpc3RbZGJJRF0ubmFtZSxcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veG1sJyk7XG5cdFx0XHRsZXQgZmVlZCA9IGF3YWl0IGJ1aWxkT1BEU0lEKG9wdGlvbnMsIHsgZGJJRCB9KTtcblx0XHRcdHJlcy5zZW5kKGZlZWQudG9YTUwoKSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRpZiAoZGJJRClcblx0XHRcdHtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihgZGJJRDogJHtkYklEfSDkuI3lrZjlnKhgKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG5leHQoKTtcblx0XHR9XG5cdH0pO1xuXG5cdGxldCBvcGRzSW5kZXggPSAocmVxOiBSZXF1ZXN0LCByZXM6IFJlc3BvbnNlLCBuZXh0OiBOZXh0RnVuY3Rpb24pID0+XG5cdHtcblx0XHRyZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veG1sJyk7XG5cdFx0cmVzLnNlbmQoYnVpbGRPUERTSW5kZXgob3B0aW9ucykudG9YTUwoKSk7XG5cdH07XG5cblx0cm91dGVyLnVzZSgnL29wZHMoXFwueG1sKT8nLCBvcGRzSW5kZXgpO1xuXHRyb3V0ZXIudXNlKCcvJywgb3Bkc0luZGV4KTtcblxuXHRyb3V0ZXIudXNlKCcqJywgKHJlcTogUmVxdWVzdCwgcmVzOiBSZXNwb25zZSwgbmV4dDogTmV4dEZ1bmN0aW9uKSA9PlxuXHR7XG5cdFx0cmV0dXJuIG5leHQoKTtcblx0fSk7XG5cblx0cmV0dXJuIHJvdXRlclxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVIYW5kbGVyXG4iXX0=