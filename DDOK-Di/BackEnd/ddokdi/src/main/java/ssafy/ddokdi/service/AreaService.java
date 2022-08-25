package ssafy.ddokdi.service;

import java.util.List;
import java.util.Map;

public interface AreaService {

    public List<String> getZoneAll();
    public void addZone(String zone);
    public Map<String,String> delZone(String zone);
    public void delZoneAll();
}
