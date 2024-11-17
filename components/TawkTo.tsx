// components/TawkTo.tsx
"use client"
import { useEffect } from 'react';

// <!--Start of Tawk.to Script-->
// <script type="text/javascript">
//     var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
//     (function(){
//     var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
//     s1.async=true;
//     s1.src='https://embed.tawk.to/673092a12480f5b4f59b509c/1icarpi5m';
//     s1.charset='UTF-8';
//     s1.setAttribute('crossorigin','*');
//     s0.parentNode.insertBefore(s1,s0);
// })();
// </script>
// <!--End of Tawk.to Script-->
//  成功集成tawk
const TawkTo: React.FC = () => {
    useEffect(() => {
        const Tawk_API: any = window.Tawk_API || {};
        const Tawk_LoadStart = new Date();

        // 可选：设置访客信息
        Tawk_API.visitor = {
            name: 'Visitor Name',
            email: 'visitor@example.com',
        };

        const script = document.createElement('script');
        script.src = 'https://embed.tawk.to/673092a12480f5b4f59b509c/1icarpi5m'; // 替换为您的 Property ID
        script.async = true;
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');

        document.body.appendChild(script);

        return () => {
            // 清理脚本
            const existingScript = document.querySelector(`script[src="${script.src}"]`);
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []);

    return null; // 该组件本身不需要渲染任何内容
};

export default TawkTo;