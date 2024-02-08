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
                        data.content.grade = data.content.grade.filter(grade => {
                            return grade.code !== "my_pu_amount";
                        });
                        // 修改活动总积分
                        data.content.grade.forEach(item => {
                            if (item.code === "credit") {
                                item.desc = "999";
                            }
                        });
                    }
                    // 去除“成长站”,“PU商城”,“校园生活”
                    if (data.content.floor) {
                        data.content.floor = data.content.floor.filter(floor => {
                            return floor.id !== "8" && floor.id !== "9";
                        });
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
                console.error("Error parsing JSON:", error);
            }
            break;
        default:
            $done({})
    }
    $done({body})
} else $done({});