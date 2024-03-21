exports.hateoasifyCollectionWood = () => {
    return [
        { 
            rel: "readall", 
            href: "/api/wood/", 
            method: "GET" 
        },
        { 
            rel: "by hardness", 
            href: "/api/wood/:hardness", 
            method: "GET" 
        },
        { 
            rel: "create", 
            href: "/api/wood/create", 
            method: "POST" 
        }
    ];
}

exports.hateoasifyWood = (woodId, hardness) => {
    return [
        { 
            rel: "self", 
            href: `/api/wood/${woodId}`, 
            method: "GET" 
        },
        { 
            rel: "edit", 
            href: `/api/wood/${woodId}`, 
            method: "PUT" 
        },
        { 
            rel: "delete", 
            href: `/api/wood/${woodId}`, 
            method: "DELETE" 
        },
        { 
            rel: "sameHardness", 
            href: `/api/wood/hardness/${hardness}`, 
            method: "GET" 
        }
    ];
}