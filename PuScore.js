let body = $response.body;
if (body){
    switch (!0){
        case /^https?:\/\/pocketuni.net\/api\/User\/personalCenter/.test($request.url):
            try {
                let data = JSON.parse(body);
                if (data && data.content && data.content.grade) {
                    // 遍历 grade 数组找到对应的对象
                    data.content.grade.forEach(item => {
                        if (item.code === "credit") {
                            // 修改 desc 的值
                            item.desc = "999";
                        }
                    });
                    // 修改完成后将数据转换回字符串
                    body = JSON.stringify(data);
                }
            } catch (error) {
                console.log("Error parsing JSON", error);
            }
            break;
        default:
            $done({})
    }
    $done({body})
} else $done({});
