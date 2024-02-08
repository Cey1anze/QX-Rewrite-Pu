let body = $response.body;
if (body){
    switch (!0){
        /**
         * 虚假分数
         * 个人主页精简
         */
        case /^https?:\/\/pocketuni.net\/api\/User\/personalCenter/.test($request.url):
            try {
                let data = JSON.parse(body);
                if (data && data.content) {
                    // 去除“PU金豆”
                    if (data.content.grade) {
                        // 修改活动总积分
                        data.content.grade.forEach(item => {
                            if (item.code === "credit") {
                                item.desc = "999";
                            }
                        });
                    }
                    // 去除“成长站”,“PU商城”,“校园生活”
                    if (data && data.content && data.content.floor) {
                        data.content.floor = data.content.floor.filter(floor => {
                            return floor.id !== "8" && floor.id !== "9";
                        });
                        let floor7 = data.content.floor.find(floor => floor.id === "7");
                        if (floor7 && floor7.list) {
                            floor7.list = floor7.list.filter(item => item.code !== "balance");
                        }
                        // 修改完成后将数据转换回字符串
                        body = JSON.stringify(data);
                    }
                    body = JSON.stringify(data);
                }
            } catch (error) {
                console.error("Error parsing JSON", error);
            }
            break;
        /**
         * Tab栏精简
         */
        case /^https?:\/\/pocketuni.net\/api\/Public\/configs/.test($request.url):
            try {
                let data = JSON.parse(body);
                if (data && data.content && data.content.tabs) {
                    data.content.tabs = data.content.tabs.filter(tab => {
                        return tab.key !== "zhaopin" && tab.key !== "shop" && tab.key !== "weibo";
                    });
                    body = JSON.stringify(data);
                }
            } catch (error) {
                console.error("Error parsing JSON", error);
            }
            break;
        /**
         * 主页精简
         */
        case /^https?:\/\/pocketuni.net\/api\/article\/index/.test($request.url):
            try {
                let data = JSON.parse(body);
                if (data && data.content) {
                    // 删除指定的键值对
                    delete data.content.home_top_ad;
                    delete data.content.place_ad_1;
                    delete data.content.place_ad_2;
                    delete data.content.place_ad_3;
                    delete data.content.banner2;
                    delete data.content.articles;
                    delete data.content.entry2;
                    body = JSON.stringify(data);
                }
            } catch (error) {
                console.error("Error parsing JSON", error);
            }
            break;
        default:
            $done({})
    }
    $done({body})
} else $done({});