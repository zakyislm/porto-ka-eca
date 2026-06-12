import frontmatter
import markdown
import base64
from jinja2 import Environment, FileSystemLoader

import codecs

def _0zmxi9sn21sn():
    raw_js = """
(function(){
    var _0x7f4b2a = 404, _0x1c9d8e = "hello", _0x9e3f1b = [1,2,3], _0x5a2c4d = {k:1}, _0x3b8e7f = true, _0x8c1d5a = null, _0x4f6a9c = 2.71, _0x2e5b8d = "unused", _0x6a3c1f = 100, _0x1d4e7b = "bar";
    function _0x8f3a1c(a) { return a * 3; }
    function _0x5e2b4d(b) { return b + 2; }
    function _0x3c9f7a(c) { return c - 5; }
    
    var _0x9a1c4b = document.getElementById('gh-attr');
    if(_0x9a1c4b){
        _0x9a1c4b.innerHTML = '<i class="devicon-github-original text-sm"></i><span class="pt-[1px]">by <a href="https://zakyislm.github.io" target="_blank" rel="noopener noreferrer" class="hover:text-background transition-colors">zakyislm</a></span>';
    }
})();
"""
    # 1. Base64 encode
    b64_str = base64.b64encode(raw_js.encode('utf-8')).decode('utf-8')
    
    # 2. ROT13 Cipher
    rot13_str = codecs.encode(b64_str, 'rot_13')
    
    # 3. Hexadecimal Encoding (Simulating Hash)
    hex_str = rot13_str.encode('utf-8').hex()
    
    decoder_js = f"(function(_0x1){{eval(atob(_0x1.replace(/[a-zA-Z]/g,function(c){{return String.fromCharCode((c<='Z'?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26)}})))}})((function(h){{var s='';for(var i=0;i<h.length;i+=2)s+=String.fromCharCode(parseInt(h.substr(i,2),16));return s;}})('{hex_str}'));"
    return decoder_js

def build():
    # Load content from Markdown file
    with open('RESHA.md', 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)

    # Convert Markdown body to HTML
    cn8xabCNTnab = markdown.markdown(post.content)

    # Setup Jinja2 environment and load template
    env = Environment(loader=FileSystemLoader('.'))
    template = env.get_template('template.html')

    # Generate obfuscated JS for github attribution
    v8xzWQbxyz = _0zmxi9sn21sn()

    # Render template with variables
    output = template.render(
        name=post.get('name', ''),
        status=post.get('status', ''),
        role=post.get('role', ''),
        image_url=post.get('image_url', ''),
        tags=post.get('tags', []),
        education=post.get('education', []),
        experience=post.get('experience', []),
        cv_link=post.get('cv_link', '#'),
        contact_link=post.get('contact_link', '#contact'),
        social_links=post.get('social_links', {}),
        footer_copyright=post.get('footer_copyright', ''),
        v8xzWQbxyz=v8xzWQbxyz,
        content=cn8xabCNTnab
    )

    # Save rendered output to index.html
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(output)

    print("Site built successfully to index.html!")

if __name__ == "__main__":
    build()
