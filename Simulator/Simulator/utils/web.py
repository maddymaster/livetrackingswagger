import urllib2
import urllib
def httpRequest(url,data=None,method=None):
    if data:
        data = urllib.urlencode(data)
    request = urllib2.Request(url,data)
    if method:
        request.get_method = lambda: method
    return urllib2.urlopen(request)