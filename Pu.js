let body = $response.body;
if (body){
    switch (!0){
        case /^https?:\/\/pocketuni.net\/api\/User\/personalCenter/.test($request.url):
            try {
                let data = JSON.parse(body);
                if (data && data.content && data.content.grade) {
                    data.content.grade.forEach(item => {
                        if (item.code === "credit") {
                            // 修改 desc 的值
                            item.desc = "999";
                        }
                    });
                    body = JSON.stringify(data);
                }
            } catch (error) {
                console.log("Error parsing JSON", error);
            }
            break;
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